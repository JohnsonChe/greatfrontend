import { NextResponse } from 'next/server'
import { supabase } from '../../../../utils/supabase/client'
import getCreditCardNetwork from '../../../../utils/getCreditCardNetwork'
import { CartItemType } from '@components/e-commerce/contexts/CartContext'

export async function POST(req: Request) {
  const { formData, itemsInCart } = await req.json()
  const {
    email,
    shippingCountry,
    shippingFirstName,
    shippingLastName,
    shippingCity,
    shippingState,
    shippingZip,
    shippingAddressLineOne,
    shippingAddressLineTwo,
    'cc-card': ccCard,
    'cc-name': ccName,
    'cc-expiry': ccExpiry,
    'cc-cvv': ccCVV,
    deliveryMethod,
    cartTotal
  } = formData
  const cardNetwork = getCreditCardNetwork(ccCard)
  const submittedOrder = await supabase
    .from('Orders')
    .insert({
      subtotal: cartTotal,
      discount: deliveryMethod === 'express' ? 15 : 0,
      shipping_address: `${shippingAddressLineOne} ${shippingAddressLineTwo} ${shippingCity} ${shippingState} ${shippingZip} ${shippingCountry}`,
      last_four_card: ccCard.slice(-4),
      card_type: cardNetwork,
      email
    })
    .select('*')

  if (submittedOrder.data) {
    const entry: any = submittedOrder.data[0]
    const promises = itemsInCart.map((item: CartItemType) =>
      supabase.from('OrderItems').insert({
        product_id: item.product?.product_id,
        sku: item.sku,
        order_id: entry.id
      })
    )

    if (promises.length > 0) {
      await Promise.all(promises)
    }
  }
  return NextResponse.json({ order: submittedOrder })
}
