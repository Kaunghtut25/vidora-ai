'use client';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '5 videos per month',
      '720p quality',
      '6 AI voices',
      'Basic video editing',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: [
      'Unlimited videos',
      '4K quality',
      '12 AI voices',
      'Deep research mode',
      'Priority rendering',
      'Advanced editing tools',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'API access',
      'White-label exports',
      'Team collaboration',
      'Dedicated support',
      'Custom integrations',
      'SSO & SAML',
    ],
  },
];

export async function createCheckoutSession(
  planId: string,
  userId: string
): Promise<{ url: string }> {
  // Mock implementation — simulates Stripe checkout session creation
  console.log(
    `Creating checkout session for plan "${planId}", user "${userId}"`
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { url: '/dashboard?checkout=success' };
}

export async function cancelSubscription(userId: string): Promise<void> {
  // Mock implementation — simulates Stripe subscription cancellation
  console.log(`Cancelling subscription for user "${userId}"`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function getSubscription(
  userId: string
): Promise<{ plan: string; status: string; currentPeriodEnd: string }> {
  // Mock implementation — simulates fetching subscription from Stripe
  console.log(`Fetching subscription for user "${userId}"`);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    plan: 'pro',
    status: 'active',
    currentPeriodEnd: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
}

export function formatPrice(price: number, interval: string): string {
  if (price === 0) return 'Free';
  const period = interval === 'year' ? 'yr' : 'mo';
  return `$${price}/${period}`;
}
