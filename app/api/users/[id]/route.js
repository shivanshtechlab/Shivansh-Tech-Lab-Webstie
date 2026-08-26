import { NextResponse } from 'next/server';
import User, { syncModel } from '../../../../models/User';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export async function GET(_, { params }) {
  try {
    await syncModel();
    const { id } = await params;
    const user = await User.findByPk(id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await syncModel();
    const { id } = await params;
    const { name, email, phone, role, status } = await req.json();

    if (!name?.trim())  return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    if (!role)          return NextResponse.json({ success: false, message: 'Role is required' }, { status: 400 });

    const user = await User.findByPk(id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    await user.update({
      name: name.trim(), email: email.trim().toLowerCase(),
      phone: phone?.trim() || null, role,
      status: status || 'active', avatar: initials(name.trim()),
    });

    return NextResponse.json({ success: true, data: user, message: 'User updated successfully' });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError')
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    if (err.name === 'SequelizeValidationError')
      return NextResponse.json({ success: false, message: err.errors[0]?.message }, { status: 400 });
    console.error('[PUT /api/users/id]', err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await syncModel();
    const { id } = await params;
    const user = await User.findByPk(id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    await user.destroy();
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('[DELETE /api/users/id]', err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
