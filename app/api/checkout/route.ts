import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { items, email, name, boxSize } = await request.json()

    if (!items || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const total = items.reduce((sum: number, item: any) => sum + item.price, 0)

    console.log('Order received:', { items, email, name, boxSize, total })

    return NextResponse.json({
      success: true,
      message: 'Order received',
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
