export interface PaymentInitiationParams {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number; // in NGN
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

export interface PaymentGatewayConfig {
  provider: 'paystack' | 'flutterwave' | 'simulation';
  paystackPublicKey?: string;
  flutterwavePublicKey?: string;
  isTestMode: boolean;
}

class PaymentService {
  private config: PaymentGatewayConfig;

  constructor() {
    this.config = {
      provider: (import.meta.env.VITE_PAYMENT_PROVIDER as 'paystack' | 'flutterwave') || 'simulation',
      paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
      flutterwavePublicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '',
      isTestMode: import.meta.env.DEV || !import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    };
  }

  public getConfig(): PaymentGatewayConfig {
    return { ...this.config };
  }

  /**
   * Initializes payment transaction.
   * If real Paystack public key is configured, loads Paystack Pop script dynamically.
   * If in demo/sandbox without backend keys, provides a realistic test simulator.
   */
  public async initializePayment(params: PaymentInitiationParams): Promise<void> {
    const { paystackPublicKey } = this.config;

    // Check if live/test Paystack Public Key is configured
    if (paystackPublicKey && paystackPublicKey.startsWith('pk_')) {
      return this.triggerPaystackInline(params, paystackPublicKey);
    }

    // Otherwise use clearly labeled Test Sandbox / Integration Layer
    return this.triggerSandboxSimulation(params);
  }

  private triggerPaystackInline(params: PaymentInitiationParams, publicKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Load Paystack script if not present
      if (typeof (window as unknown as { PaystackPop?: unknown }).PaystackPop === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => {
          this.openPaystackPopup(params, publicKey);
          resolve();
        };
        script.onerror = () => {
          params.onError('Failed to load Paystack payment gateway. Please check connection.');
          reject(new Error('Paystack script load error'));
        };
        document.body.appendChild(script);
      } else {
        this.openPaystackPopup(params, publicKey);
        resolve();
      }
    });
  }

  private openPaystackPopup(params: PaymentInitiationParams, publicKey: string): void {
    const win = window as unknown as {
      PaystackPop?: {
        setup: (options: Record<string, unknown>) => { openIframe: () => void };
      };
    };

    if (!win.PaystackPop) {
      params.onError('Paystack modal failed to initialize.');
      return;
    }

    const handler = win.PaystackPop.setup({
      key: publicKey,
      email: params.customerEmail,
      amount: params.amount * 100, // Paystack requires amount in kobo
      currency: 'NGN',
      ref: 'LAN_' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: params.customerName },
          { display_name: 'Phone Number', variable_name: 'phone_number', value: params.customerPhone },
          { display_name: 'Order ID', variable_name: 'order_id', value: params.orderId },
        ],
        ...params.metadata,
      },
      callback: (response: { reference: string }) => {
        // In production: send response.reference to your backend server to verify via Paystack API
        params.onSuccess(response.reference);
      },
      onClose: () => {
        params.onCancel();
      },
    });

    handler.openIframe();
  }

  private triggerSandboxSimulation(params: PaymentInitiationParams): Promise<void> {
    return new Promise((resolve) => {
      // Simulate network request to payment processor with explicit status
      setTimeout(() => {
        const mockRef = `PST_SANDBOX_${Date.now()}_${Math.floor(Math.random() * 89999 + 10000)}`;
        params.onSuccess(mockRef);
        resolve();
      }, 1200);
    });
  }
}

export const paymentService = new PaymentService();
