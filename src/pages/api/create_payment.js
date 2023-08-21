const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const {plan} = JSON.parse(req.body);
  if (req.method === 'POST') {
    const price =
      plan === "monthly"
        ? 'price_1NH64SKQJr0Ow5EmXAWbbXTE'
        : plan === 'semi-annual'
        ? 'price_1NH666KQJr0Ow5Em83jFkTfi'
        : 'price_1NHAcBKQJr0Ow5EmVpRaEDfH'
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/pricing/?paymentStatus=success&plan=${plan}`,
        cancel_url: `${req.headers.origin}/pricing/?paymentStatus=canceled`,
      })

      res.send(session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
