import { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { CheckoutFormData, OrderConfirmation } from '../../types';
import styles from './CheckoutModal.module.css';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    tax, 
    total, 
    clearCart,
    lastOrder,
    setLastOrder,
    addOrderToHistory,
    setIsOrdersModalOpen,
    setActiveTrackingOrderId
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'NEXUS-' + Math.floor(10000 + Math.random() * 90000);
      const trackingNumber = 'NX-TRK-' + Math.floor(100000 + Math.random() * 900000);
      const dateFormatted = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const estDeliveryDate = new Date();
      estDeliveryDate.setDate(estDeliveryDate.getDate() + 2);
      const estimatedDelivery = estDeliveryDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const order: OrderConfirmation = {
        orderId,
        customerName: formData.fullName,
        customerEmail: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        subtotal,
        tax,
        total,
        date: dateFormatted,
        timestamp: Date.now(),
        items: [...cart],
        status: 'processing',
        trackingNumber,
        carrier: 'Nexus Express Logistics',
        estimatedDelivery,
        timeline: [
          { status: 'processing', title: 'Orden Confirmada', description: 'Pago verificado y recibido en sistema.', timestamp: 'Ahora', completed: true },
          { status: 'packed', title: 'Empaquetado en Almacén', description: 'En preparación para despacho.', timestamp: 'Pendiente', completed: false },
          { status: 'shipped', title: 'En Camino con Repartidor', description: 'Tránsito a dirección de destino.', timestamp: 'Pendiente', completed: false },
          { status: 'delivered', title: 'Entrega Programada', description: 'Paquete recibido por el cliente.', timestamp: 'Pendiente', completed: false }
        ]
      };

      setLastOrder(order);
      addOrderToHistory(order);
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastOrder(null);
  };

  const handleOpenTracking = () => {
    if (lastOrder) {
      setActiveTrackingOrderId(lastOrder.orderId);
      setIsOrdersModalOpen(true);
      handleClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className={styles.closeBtn} 
          onClick={handleClose}
          aria-label="Cerrar checkout"
        >
          <X size={18} />
        </button>

        {lastOrder ? (
          /* Success Screen */
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={40} />
            </div>

            <h2>¡Pago Procesado con Éxito!</h2>
            <p className={styles.subtitle}>
              Gracias por tu compra, <strong>{lastOrder.customerName}</strong>. Hemos enviado los detalles a tu correo electrónico.
            </p>

            <div className={styles.orderCard}>
              <div className={styles.orderMetaRow}>
                <span className={styles.orderMetaLabel}>Número de Orden:</span>
                <span className={styles.orderMetaVal}>{lastOrder.orderId}</span>
              </div>
              <div className={styles.orderMetaRow}>
                <span className={styles.orderMetaLabel}>Código de Rastreo:</span>
                <span className={styles.orderMetaVal} style={{ color: '#00f0ff', fontFamily: 'monospace' }}>{lastOrder.trackingNumber}</span>
              </div>
              <div className={styles.orderMetaRow}>
                <span className={styles.orderMetaLabel}>Fecha y Hora:</span>
                <span className={styles.orderMetaVal}>{lastOrder.date}</span>
              </div>
              <div className={styles.orderMetaRow}>
                <span className={styles.orderMetaLabel}>Artículos Comprados:</span>
                <span className={styles.orderMetaVal}>
                  {lastOrder.items.reduce((s, i) => s + i.quantity, 0)} productos
                </span>
              </div>
              <div className={styles.orderMetaRow}>
                <span className={styles.orderMetaLabel}>Total Pagado:</span>
                <span className={styles.orderMetaVal}>
                  ${lastOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '1rem' }}>
              <button 
                className={styles.continueBtn} 
                onClick={handleOpenTracking}
                style={{ background: 'linear-gradient(135deg, #00f0ff, #7000ff)', border: 'none', flex: 1 }}
              >
                <Truck size={18} />
                <span>Rastrear Envío Ahora</span>
              </button>
              <button 
                className={styles.continueBtn} 
                onClick={handleClose}
                style={{ background: 'rgba(255,255,255,0.08)', flex: 1 }}
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <>
            <h2 className={styles.title}>
              <ShieldCheck size={26} color="var(--accent-primary)" />
              <span>Finalizar Pedido</span>
            </h2>
            <p className={styles.subtitle}>
              Completa los datos de envío y pago seguro (Transacción simulada).
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Shipping Section */}
              <div className={styles.sectionHeading}>
                <Truck size={18} />
                <span>Dirección de Envío</span>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    placeholder="Ej. Juan Pérez"
                    className={styles.input}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="juan@ejemplo.com"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Dirección *</label>
                <input
                  type="text"
                  required
                  name="address"
                  placeholder="Calle, número, depto..."
                  className={styles.input}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Ciudad *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    placeholder="Ej. Madrid, CDMX, Lima..."
                    className={styles.input}
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Código Postal *</label>
                  <input
                    type="text"
                    required
                    name="zipCode"
                    placeholder="Ej. 28001"
                    className={styles.input}
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className={styles.sectionHeading}>
                <CreditCard size={18} />
                <span>Detalles de Pago</span>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Número de Tarjeta *</label>
                <input
                  type="text"
                  required
                  name="cardNumber"
                  maxLength={19}
                  placeholder="4532 •••• •••• 8892"
                  className={styles.input}
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Expiración (MM/AA) *</label>
                  <input
                    type="text"
                    required
                    name="cardExpiry"
                    maxLength={5}
                    placeholder="12/28"
                    className={styles.input}
                    value={formData.cardExpiry}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>CVC / CVV *</label>
                  <input
                    type="text"
                    required
                    name="cardCvc"
                    maxLength={4}
                    placeholder="345"
                    className={styles.input}
                    value={formData.cardCvc}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className={styles.orderSummaryBox}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} artículos)</span>
                  <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Impuestos estimados (16%)</span>
                  <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Envío Express</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>GRATIS</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total a Pagar</span>
                  <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isProcessing || cart.length === 0}
              >
                {isProcessing ? (
                  <span>Procesando pago seguro...</span>
                ) : (
                  <>
                    <span>Confirmar y Pagar ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
