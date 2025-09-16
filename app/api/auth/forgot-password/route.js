import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request) {
  try {
    console.log('Forgot password API called'); // Debug log
    
    await connectDB();
    console.log('Database connected'); // Debug log
    
    const { email } = await request.json();
    console.log('Email received:', email); // Debug log
    
    if (!email) {
      return NextResponse.json(
        { error: 'Please provide an email address' },
        { status: 400 }
      );
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
    console.log('Reset token generated'); // Debug log
    
    // Send email
    try {
      await sendPasswordResetEmail(user.email, resetToken, user.name);
      console.log('Email sent successfully'); // Debug log
      
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError); // Debug log
      
      // Reset the token if email fails
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      
      return NextResponse.json(
        { error: 'There was an error sending the email. Please try again later.' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
