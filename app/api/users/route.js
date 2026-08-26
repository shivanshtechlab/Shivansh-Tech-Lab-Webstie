import { NextResponse } from 'next/server';
import User, { syncModel } from '../../../models/User';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export async function GET() {
  try {
    await syncModel();
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    return NextResponse.json({ success: true, data: users, total: users.length });
  } catch (err) {
    console.error('[GET /api/users]', err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await syncModel();
    const { name, email, phone, role, status } = await req.json();

    if (!name?.trim())  return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    if (!role)          return NextResponse.json({ success: false, message: 'Role is required' }, { status: 400 });

    const user = await User.create({
      name: name.trim(), email: email.trim().toLowerCase(),
      phone: phone?.trim() || null, role,
      status: status || 'active', avatar: initials(name.trim()),
    });

    return NextResponse.json({ success: true, data: user, message: 'User created successfully' }, { status: 201 });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError')
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    if (err.name === 'SequelizeValidationError')
      return NextResponse.json({ success: false, message: err.errors[0]?.message }, { status: 400 });
    console.error('[POST /api/users]', err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
