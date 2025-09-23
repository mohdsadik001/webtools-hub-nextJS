
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyReCaptcha } from '@/lib/utils';

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, email, password, recaptchaToken } = await request.json();
    
    // Validation
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Please complete the reCAPTCHA verification' },
        { status: 400 }
      );
    }
    
    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyReCaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase().trim() 
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password
    });
    
    await user.save();

    
    // console.log('User created successfully:', user.email);
    
    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
