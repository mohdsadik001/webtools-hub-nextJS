import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { validatePassword } from '@/lib/utils';

export async function POST(request) {
  try {
    await connectDB();
    
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Please provide token and new password' },
        { status: 400 }
      );
    }
    
    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Token is invalid or has expired' },
        { status: 400 }
      );
    }
    
    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
