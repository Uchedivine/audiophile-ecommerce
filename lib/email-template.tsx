import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface EmailTemplateProps {
  customerName: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your order {orderId} has been confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerText}>🎧 Audiophile</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {customerName},</Text>
            
            <Text style={paragraph}>
              Thank you for your order! We've received your purchase and it's being processed.
            </Text>

            {/* Order ID */}
            <Section style={orderIdBox}>
              <Text style={orderIdLabel}>ORDER ID</Text>
              <Text style={orderIdValue}>{orderId}</Text>
            </Section>

            {/* Items */}
            <Text style={sectionTitle}>ORDER SUMMARY</Text>
            
            {items.map((item, index) => (
              <Section key={index} style={itemRow}>
                <div style={itemDetails}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemPrice}>${item.price.toLocaleString()}</Text>
                </div>
                <Text style={itemQuantity}>x{item.quantity}</Text>
              </Section>
            ))}

            {/* Totals */}
            <Section style={totalsBox}>
              <div style={totalRow}>
                <Text style={totalLabel}>SUBTOTAL</Text>
                <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
              </div>
              <div style={totalRow}>
                <Text style={totalLabel}>SHIPPING</Text>
                <Text style={totalValue}>${shipping.toFixed(2)}</Text>
              </div>
              <div style={totalRow}>
                <Text style={totalLabel}>TAX</Text>
                <Text style={totalValue}>${tax.toFixed(2)}</Text>
              </div>
              <Hr style={hr} />
              <div style={totalRow}>
                <Text style={grandTotalLabel}>GRAND TOTAL</Text>
                <Text style={grandTotalValue}>${total.toFixed(2)}</Text>
              </div>
            </Section>

            {/* Shipping Address */}
            <Text style={sectionTitle}>SHIPPING ADDRESS</Text>
            <Section style={addressBox}>
              <Text style={addressText}><strong>{customerName}</strong></Text>
              <Text style={addressText}>{shippingAddress.street}</Text>
              <Text style={addressText}>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </Text>
              <Text style={addressText}>{shippingAddress.country}</Text>
            </Section>

            <Text style={footerNote}>
              If you have any questions about your order, please contact us at{' '}
              <a href="mailto:support@audiophile.com" style={link}>
                support@audiophile.com
              </a>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}><strong>Audiophile</strong></Text>
            <Text style={footerText}>Premium Audio Equipment</Text>
            <Text style={footerTextSmall}>© 2025 Audiophile. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginTop: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#D87D4A',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const headerText = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0',
};

const content = {
  padding: '40px 30px',
};

const greeting = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#333333',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333333',
};

const orderIdBox = {
  backgroundColor: '#f8f8f8',
  padding: '15px',
  borderRadius: '6px',
  margin: '20px 0',
  textAlign: 'center' as const,
};

const orderIdLabel = {
  fontSize: '12px',
  color: '#666666',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 5px 0',
};

const orderIdValue = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#D87D4A',
  fontFamily: 'monospace',
  margin: '0',
};

const sectionTitle = {
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  color: '#D87D4A',
  marginTop: '30px',
  marginBottom: '15px',
  letterSpacing: '1px',
};

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px 0',
  borderBottom: '1px solid #eeeeee',
};

const itemDetails = {
  flex: 1,
};

const itemName = {
  fontWeight: '600',
  color: '#333333',
  margin: '0 0 5px 0',
  fontSize: '14px',
};

const itemPrice = {
  fontSize: '14px',
  color: '#666666',
  margin: '0',
};

const itemQuantity = {
  fontWeight: '600',
  color: '#333333',
  fontSize: '14px',
  margin: '0',
};

const totalsBox = {
  backgroundColor: '#f8f8f8',
  padding: '20px',
  borderRadius: '6px',
  marginTop: '20px',
};

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
};

const totalLabel = {
  color: '#666666',
  textTransform: 'uppercase' as const,
  fontSize: '12px',
  letterSpacing: '0.5px',
  margin: '0',
};

const totalValue = {
  fontWeight: '600',
  color: '#333333',
  margin: '0',
  fontSize: '14px',
};

const hr = {
  borderColor: '#dddddd',
  margin: '10px 0',
};

const grandTotalLabel = {
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  color: '#666666',
  margin: '0',
  letterSpacing: '0.5px',
};

const grandTotalValue = {
  fontSize: '20px',
  color: '#D87D4A',
  fontWeight: '700',
  margin: '0',
};

const addressBox = {
  backgroundColor: '#f8f8f8',
  padding: '20px',
  borderRadius: '6px',
  marginTop: '15px',
};

const addressText = {
  margin: '5px 0',
  color: '#333333',
  fontSize: '14px',
};

const footerNote = {
  marginTop: '30px',
  fontSize: '14px',
  color: '#666666',
  lineHeight: '20px',
};

const link = {
  color: '#D87D4A',
  textDecoration: 'none',
};

const footer = {
  backgroundColor: '#1a1a1a',
  padding: '30px',
  textAlign: 'center' as const,
};

const footerText = {
  margin: '5px 0',
  fontSize: '14px',
  color: '#999999',
};

const footerTextSmall = {
  marginTop: '15px',
  fontSize: '12px',
  color: '#999999',
};