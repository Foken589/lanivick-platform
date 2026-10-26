import { Order, CateringRequest } from '../types';

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
      : `🏪 *Pickup Location:* Area G, Pyakasa Hub, Abuja`;

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

_Please confirm order acceptance and dispatch schedule._`;
};

// 2. Catering & Event Confectionery Request WhatsApp Message
export const formatCateringWhatsAppMessage = (request: CateringRequest): string => {
  return `✨ *EVENT & CORPORATE CONFECTIONERY INQUIRY — LANIVICK* ✨
------------------------------------------
📋 *Request ID:* #${request.id}
👤 *Organizer:* ${request.customerName}
📞 *Phone:* ${request.customerPhone}
🎉 *Event / Service:* ${request.eventType}
📅 *Event Date:* ${request.eventDate}
👥 *Expected Guests / Packs:* ${request.guestCount}
📍 *Location:* ${request.eventLocation} (${request.city})
🍽️ *Desired Menus:* ${request.cuisinePreference.join(', ')}
💰 *Budget Range:* ${request.budgetRange}
${request.dietaryRequirements ? `🥗 *Dietary / Packaging:* ${request.dietaryRequirements}\n` : ''}
${request.specialRequests ? `📝 *Special Requests:* ${request.specialRequests}\n` : ''}
------------------------------------------
_Please provide formal pricing and availability confirmation._`;
};

// 3. Training & Partnership WhatsApp Message
export const formatTrainingWhatsAppMessage = (name: string, phone: string, program: string, message: string): string => {
  return `🎓 *BAKING & PASTRY TRAINING ENQUIRY — LANIVICK* 🎓
------------------------------------------
👤 *Applicant:* ${name}
📞 *Phone:* ${phone}
📚 *Program:* ${program}
📝 *Questions / Goals:* ${message}
------------------------------------------
_Kindly share the training syllabus, schedule, and registration details._`;
};

// 4. Admin to Customer WhatsApp update
export const formatAdminStatusUpdateWhatsAppMessage = (
  order: Order,
  customMsg?: string
): string => {
  return `Hello ${order.customerName}! ✨
This is Victoria from *Lanivick Confectionary, Pyakasa, Abuja*.

Regarding your order *#${order.id}*:
Current Status: *${order.status.toUpperCase()}*

${customMsg ? customMsg : 'We are freshly preparing your order with premium ingredients.'}

If you have any questions or need immediate delivery coordination, please reply to this chat!`;
};
