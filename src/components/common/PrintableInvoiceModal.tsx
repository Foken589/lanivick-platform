import React from 'react';
import { X, Printer, CheckCircle2, AlertCircle } from 'lucide-react';
import { Order } from '../../types';
import { formatNaira } from '../../services/whatsappService';
import { dataService } from '../../services/dataService';

interface PrintableInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const PrintableInvoiceModal: React.FC<PrintableInvoiceModalProps> = ({ order, onClose }) => {
  const settings = dataService.getSettings();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-ink-900/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 overflow-hidden z-10 border border-borderLine my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="print:hidden flex items-center justify-between pb-4 mb-6 border-b border-borderLine">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Invoice & Official Receipt Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-wine-900 text-white font-bold text-xs hover:bg-wine-800 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-ink-500 hover:bg-cream-100 hover:text-ink-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Container */}
        <div id="printable-invoice" className="bg-white text-ink-900 font-sans p-2">
          {/* Top Brand Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-borderLine">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-wine-900 text-gold-400 flex items-center justify-center font-serif text-2xl font-bold border border-gold-500/30">
                L
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-wine-900 leading-tight">
                  Lanivick Confectionary
                </h1>
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                  Cakes • Pastries • Catering • Vicky's Hairplace
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-ink-500 sm:max-w-xs">
              <p className="font-bold text-ink-800">Lokoja & Abuja, Nigeria</p>
              <p>Phone/WhatsApp: {settings.callPhone}</p>
              <p>Official Invoice Ref: #{order.id}</p>
            </div>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-xs border-b border-borderLine">
            <div>
              <span className="text-ink-500 block uppercase tracking-wider text-[10px] font-bold">
                Date Issued
              </span>
              <span className="font-semibold text-ink-800">
                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div>
              <span className="text-ink-500 block uppercase tracking-wider text-[10px] font-bold">
                Order Status
              </span>
              <span className="font-bold text-wine-900 capitalize">{order.status}</span>
            </div>

            <div>
              <span className="text-ink-500 block uppercase tracking-wider text-[10px] font-bold">
                Payment Method
              </span>
              <span className="font-semibold text-ink-800 capitalize">
                {order.paymentMethod.replace('_', ' ')}
              </span>
            </div>

            <div>
              <span className="text-ink-500 block uppercase tracking-wider text-[10px] font-bold">
                Payment Status
              </span>
              <span
                className={`inline-flex items-center gap-1 font-bold ${
                  order.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {order.paymentStatus === 'paid' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer & Fulfillment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 text-xs border-b border-borderLine">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 block mb-1">
                Billed To (Customer):
              </span>
              <p className="font-bold text-sm text-ink-900">{order.customerName}</p>
              <p className="text-ink-500">{order.customerPhone}</p>
              <p className="text-ink-500">{order.customerEmail}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 block mb-1">
                Fulfillment Logistics:
              </span>
              <p className="font-semibold text-ink-800 capitalize">
                Type: {order.fulfillmentType.replace('-', ' ')}
              </p>
              {order.deliveryAddress && (
                <p className="text-ink-500">
                  {order.deliveryAddress.streetAddress}, {order.deliveryAddress.city}
                  {order.deliveryAddress.landmark && ` (Landmark: ${order.deliveryAddress.landmark})`}
                </p>
              )}
              <p className="text-ink-500">
                Scheduled Slot: {order.preferredDate} ({order.preferredTime})
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-ink-800 text-ink-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderLine">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-2">
                      <span className="font-bold text-ink-900 block">{item.product.name}</span>
                      {item.cakeCustomization && (
                        <span className="text-[11px] text-ink-500 block italic">
                          Specs: {item.cakeCustomization.size} • {item.cakeCustomization.flavour} •{' '}
                          {item.cakeCustomization.frosting}
                          {item.cakeCustomization.inscription &&
                            ` • Inscription: "${item.cakeCustomization.inscription}"`}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-center font-medium">{item.quantity}</td>
                    <td className="py-3 text-right text-ink-500">{formatNaira(item.unitPrice)}</td>
                    <td className="py-3 text-right font-bold text-ink-900">
                      {formatNaira(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="pt-4 border-t border-borderLine flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-800">{formatNaira(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Delivery & Logistics</span>
                <span className="font-semibold text-ink-800">
                  {order.deliveryFee > 0 ? formatNaira(order.deliveryFee) : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-ink-900 pt-2 border-t-2 border-ink-900">
                <span>Grand Total</span>
                <span className="font-serif text-lg text-wine-900">
                  {formatNaira(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Bank Payment Reference Note */}
          <div className="mt-8 p-4 rounded-xl bg-cream-50 border border-borderLine text-[11px] text-ink-500 flex items-center justify-between">
            <div>
              <span className="font-bold text-ink-800 block">Bank Settlement Reference:</span>
              <p>
                {settings.bankName} • Account: {settings.accountNumber} ({settings.accountName})
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-wine-900">
              {order.paymentReference || 'N/A'}
            </span>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center text-[10px] text-ink-400">
            <p>Thank you for choosing Lanivick Confectionary & Vicky's Hairplace!</p>
            <p>For support or catering inquiries, contact 0916 222 6176.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
