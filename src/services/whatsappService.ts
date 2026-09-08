import { Order, HairBooking, CateringRequest } from '../types';

export const formatNaira = (amount: number): string => {
  return '₦' + amount.toLocaleString('en-NG');
};

export const createWhatsAppUrl = (phone: string, text: string): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const openWhatsApp = (phone: string, text: string): void => {
  const url = createWhatsAppUrl(phone, text);
  window.open(url, '_blank', 'noopener,noreferrer');
};

// 1. Order Submission Message
export const formatOrderWhatsAppMessage = (order: Order): string => {
  const itemsText = order.items
    .map((item, i) => {
      let desc = `${i + 1}. *${item.product.name}* (x${item.quantity}) — ${formatNaira(item.totalPrice)}`;
      if (item.cakeCustomization) {
        const c = item.cakeCustomization;
        desc += `\n   • Flavour: ${c.flavour}\n   • Size: ${c.size}\n   • Filling: ${c.filling}\n   • Frosting: ${c.frosting}`;
        if (c.inscription) {
          desc += `\n   • Inscription: "${c.inscription}"`;
        }
      }
      return desc;
    })
    .join('\n');

  const fulfillmentInfo =
    order.fulfillmentType === 'delivery' && order.deliveryAddress
      ? `🚚 *Delivery Address:*\n${order.deliveryAddress.streetAddress}, ${order.deliveryAddress.city}${
          order.deliveryAddress.landmark ? ` (Landmark: ${order.deliveryAddress.landmark})` : ''
        }`
      : `🏪 *Pickup Location:* ${
          order.fulfillmentType === 'pickup-lokoja' ? 'Lokoja Studio / Hub' : 'Abuja Hub'
        }`;

  return `✨ *NEW ORDER — LANIVICK CONFECTIONARY* ✨
------------------------------------------
📦 *Order ID:* #${order.id}
👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.customerPhone}
📅 *Preferred Date:* ${order.preferredDate} (${order.preferredTime})
------------------------------------------
📋 *ORDER ITEMS:*
${itemsText}

💰 *Subtotal:* ${formatNaira(order.subtotal)}
🚚 *Delivery Fee:* ${formatNaira(order.deliveryFee)}
💵 *TOTAL AMOUNT:* ${formatNaira(order.total)}
💳 *Payment Method:* ${order.paymentMethod.toUpperCase()} (${order.paymentStatus.toUpperCase()})
------------------------------------------
${fulfillmentInfo}
${order.notes ? `\n📝 *Customer Notes:* ${order.notes}` : ''}

_Please confirm availability and dispatch window._`;
};

// 2. Hair Booking WhatsApp Message
export const formatHairBookingWhatsAppMessage = (booking: HairBooking): string => {
  const locationText =
    booking.locationType === 'home_service'
      ? `🏡 *Home Service:* ${booking.homeAddress} (${booking.studioCity})`
      : `💇‍♀️ *Salon Appointment:* Vicky's Hairplace Studio (${booking.studioCity})`;

  return `✨ *HAIR APPOINTMENT BOOKING — VICKY'S HAIRPLACE* ✨
------------------------------------------
🔖 *Booking ID:* #${booking.id}
👤 *Client:* ${booking.customerName}
📞 *Phone:* ${booking.customerPhone}
💆‍♀️ *Service:* *${booking.serviceName}*
📏 *Length:* ${booking.hairLength || 'Standard'}
📐 *Size:* ${booking.hairSize || 'Medium'}
📅 *Date & Time:* ${booking.appointmentDate} at ${booking.appointmentTime}
📍 ${locationText}
💵 *Estimated Cost:* ${formatNaira(booking.estimatedPrice)}
------------------------------------------
${booking.specialNotes ? `📝 *Notes/Hair Prep:* ${booking.specialNotes}\n` : ''}
_Kindly confirm my appointment slot. Thank you!_`;
};

// 3. Catering Request WhatsApp Message
export const formatCateringWhatsAppMessage = (request: CateringRequest): string => {
  return `✨ *EVENT CATERING INQUIRY — LANIVICK CATERING* ✨
------------------------------------------
📋 *Request ID:* #${request.id}
👤 *Organizer:* ${request.customerName}
📞 *Phone:* ${request.customerPhone}
🎉 *Event Type:* ${request.eventType}
📅 *Date:* ${request.eventDate}
👥 *Guest Count:* ${request.guestCount} Guests
📍 *Location:* ${request.eventLocation} (${request.city})
🍽️ *Cuisines Desired:* ${request.cuisinePreference.join(', ')}
💰 *Budget Range:* ${request.budgetRange}
${request.dietaryRequirements ? `🥗 *Dietary Requirements:* ${request.dietaryRequirements}\n` : ''}
${request.specialRequests ? `📝 *Special Requests:* ${request.specialRequests}\n` : ''}
------------------------------------------
_Please provide a tailored menu proposal and formal quotation._`;
};

// 4. Admin to Customer WhatsApp update
export const formatAdminStatusUpdateWhatsAppMessage = (
  order: Order,
  customMsg?: string
): string => {
  return `Hello ${order.customerName}! ✨
This is Victoria from *Lanivick Confectionary & Vicky's Hairplace*.

Regarding your order *#${order.id}*:
Current Status: *${order.status.toUpperCase()}*

${customMsg ? customMsg : 'We are carefully preparing your items to ensure total perfection.'}

If you have any questions or need immediate delivery coordination, feel free to reply right here!`;
};
