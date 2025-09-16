import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { signToken, setAuthCookie } from '@/lib/auth';
import { verifyReCaptcha } from '@/lib/utils';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password, recaptchaToken } = await request.json();
    
    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
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
    
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    // Generate JWT token
    const token = signToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    
    // Set HTTP-only cookie
    await setAuthCookie(token);
    
    return NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
