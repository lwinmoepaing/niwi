# Stripe Payment

1. Go to the stripe.com
2. Create a new account and go to https://dashboard.stripe.com/
3. You can see the right side , For Developer,
4. There are Publish Key And Secret Key that you can copy it
5. You can see right top "Developer" Button, Click on it and Choose "Webhooks" tab
6. For Production "Add an endpoint" But for now We'll choose 'Test in a local environment'
7. You can pick "endpoint_secret" on the right side the part of "Sample Endpoint" Tab , Please find it and take the value.
8. Set Your Environment Key

# Requirement

please open your terminal 0. For macos "brew install stripe/stripe-cli/stripe" and for other you need to go "https://docs.stripe.com/stripe-cli" and download cli version of stripe

# Command line

1. `stripe login`
2. `stripe listen --forward-to localhost:3000/api/webhook/payment`

It'll show like this

```
Ready! You are using Stripe API Version [2024-06-20]. Your webhook signing secret is
```

3. Open the new terminal tab and type command `stripe trigger payment_intent.succeeded`

# To make Subscription Payment

1. go to dashboard of stripe and you gonna see left side "Product catalog" , click on it
2. And then click "+ Add Production" on the top right side
3. Fill the name "Niwi Basic Monthly Plan" but you can use your own Proudct Name
4. Input price and choose Monthly
5. You can get Product ID on the right side of the screen.
