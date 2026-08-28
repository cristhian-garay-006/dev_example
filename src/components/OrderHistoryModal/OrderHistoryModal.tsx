import { useState } from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  FileText, 
  Printer, 
  Search, 
  Play, 
  Box, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { OrderConfirmation, OrderStatus, CartItem } from '../../types';
import styles from './OrderHistoryModal.module.css';

export const OrderHistoryModal = () => {
  const { 
    isOrdersModalOpen, 
    setIsOrdersModalOpen, 
    ordersHistory, 
    activeTrackingOrderId, 
    setActiveTrackingOrderId,
    updateOrderStatus 
  } = useCart();

  const [activeTab, setActiveTab] = useState<'list' | 'tracker'>('list');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderConfirmation | null>(null);
  const [searchTrackingQuery, setSearchTrackingQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOrdersModalOpen) return null;

  // Determine current active order for tracking tab
  let trackingOrder = ordersHistory.find(
    (o: OrderConfirmation) => o.orderId === activeTrackingOrderId || o.trackingNumber === searchTrackingQuery.trim()
  );

  if (!trackingOrder && ordersHistory.length > 0) {
    trackingOrder = ordersHistory[0];
  }

  const handleClose = () => {
    setIsOrdersModalOpen(false);
    setSelectedReceiptOrder(null);
  };

  const handleTrackOrder = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setActiveTab('tracker');
  };

  const handleCopyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return <span className={`${styles.statusBadge} ${styles.statusProcessing}`}><Clock size={14} /> Procesando</span>;
      case 'packed':
        return <span className={`${styles.statusBadge} ${styles.statusPacked}`}><Box size={14} /> Empaquetado</span>;
      case 'shipped':
        return <span className={`${styles.statusBadge} ${styles.statusShipped}`}><Truck size={14} /> En Camino</span>;
      case 'delivered':
        return <span className={`${styles.statusBadge} ${styles.statusDelivered}`}><CheckCircle2 size={14} /> Entregado</span>;
    }
  };

  const getProgressPercentage = (status: OrderStatus) => {
    switch (status) {
      case 'processing': return 15;
      case 'packed': return 40;
      case 'shipped': return 75;
      case 'delivered': return 100;
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Package size={24} color="#00f0ff" />
            <h2>Historial de Pedidos y Rastreo</h2>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.navTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'list' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <Package size={18} />
            <span>Mis Compras ({ordersHistory.length})</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'tracker' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Truck size={18} />
            <span>Rastreador de Envío</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {activeTab === 'list' ? (
            /* LIST VIEW */
            <div className={styles.ordersList}>
              {ordersHistory.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <Package size={32} />
                  </div>
                  <h3>No tienes pedidos registrados aún</h3>
                  <p>Tus compras aparecerán aquí con el desglose y el código de seguimiento de envío.</p>
                </div>
              ) : (
                ordersHistory.map((order: OrderConfirmation) => (
                  <div key={order.orderId} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderIdGroup}>
                        <span className={styles.orderIdText}>{order.orderId}</span>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* Products Thumbnail Strip */}
                    <div className={styles.orderProductsRow}>
                      {order.items.map((item: CartItem, idx: number) => (
                        <img 
                          key={idx}
                          src={item.product.image} 
                          alt={item.product.name} 
                          className={styles.productThumb}
                          title={`${item.product.name} (x${item.quantity})`}
                        />
                      ))}
                    </div>

                    <div className={styles.orderFooter}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total: </span>
                        <span className={styles.totalPrice}>
                          ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className={styles.orderActions}>
                        <button 
                          className={styles.btnSecondary}
                          onClick={() => setSelectedReceiptOrder(order)}
                        >
                          <FileText size={16} />
                          <span>Ver Recibo</span>
                        </button>
                        <button 
                          className={styles.btnPrimary}
                          onClick={() => handleTrackOrder(order.orderId)}
                        >
                          <Truck size={16} />
                          <span>Rastrear Envío</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* TRACKER VIEW */
            <div className={styles.trackerContainer}>
              {/* Tracker Search Input */}
              <div className={styles.trackerSearchBox}>
                <Search size={18} color="var(--text-secondary)" />
                <input 
                  type="text"
                  placeholder="Buscar por ID de Orden (ej. NEXUS-89412) o Código de Rastreo..."
                  className={styles.trackerSearchInput}
                  value={searchTrackingQuery}
                  onChange={e => setSearchTrackingQuery(e.target.value)}
                />
              </div>

              {trackingOrder ? (
                <div className={styles.trackingCard}>
                  {/* Top Details */}
                  <div className={styles.trackingHeaderInfo}>
                    <div className={styles.trackingCodeGroup}>
                      <span className={styles.trackingCodeTitle}>Número de Seguimiento</span>
                      <div className={styles.codeCopyRow}>
                        <span className={styles.trackingCodeText}>{trackingOrder.trackingNumber}</span>
                        <button 
                          className={styles.copyBtn} 
                          onClick={() => handleCopyTrackingCode(trackingOrder!.trackingNumber)}
                        >
                          {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                          <span>{copiedCode ? '¡Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={styles.trackingCodeTitle}>Transportista / Entrega</span>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                        {trackingOrder.carrier}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#00f0ff', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end', marginTop: '0.2rem' }}>
                        <Calendar size={14} />
                        <span>Estimado: {trackingOrder.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address Summary */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
                    <MapPin size={16} color="#00f0ff" />
                    <span><strong>Destino:</strong> {trackingOrder.address}, {trackingOrder.city} ({trackingOrder.customerName})</span>
                  </div>

                  {/* Visual Stepper Timeline */}
                  <div className={styles.stepperWrapper}>
                    <div className={styles.progressBarTrack}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${getProgressPercentage(trackingOrder.status)}%` }}
                      />
                    </div>

                    <div className={styles.stepperGrid}>
                      {/* Step 1: Processing */}
                      <div className={`
                        ${styles.stepNode} 
                        ${trackingOrder.status === 'processing' ? styles.stepNodeCurrent : ''}
                        ${['packed', 'shipped', 'delivered'].includes(trackingOrder.status) ? styles.stepNodeCompleted : ''}
                      `}>
                        <div className={styles.stepIconCircle}>
                          <Clock size={20} />
                        </div>
                        <span className={styles.stepTitle}>Confirmada</span>
                        <span className={styles.stepDesc}>Pago validado</span>
                        <span className={styles.stepTime}>{trackingOrder.timeline[0]?.timestamp || 'OK'}</span>
                      </div>

                      {/* Step 2: Packed */}
                      <div className={`
                        ${styles.stepNode} 
                        ${trackingOrder.status === 'packed' ? styles.stepNodeCurrent : ''}
                        ${['shipped', 'delivered'].includes(trackingOrder.status) ? styles.stepNodeCompleted : ''}
                      `}>
                        <div className={styles.stepIconCircle}>
                          <Box size={20} />
                        </div>
                        <span className={styles.stepTitle}>Empaquetado</span>
                        <span className={styles.stepDesc}>Listo en almacén</span>
                        <span className={styles.stepTime}>{trackingOrder.timeline[1]?.timestamp || 'Pendiente'}</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className={`
                        ${styles.stepNode} 
                        ${trackingOrder.status === 'shipped' ? styles.stepNodeCurrent : ''}
                        ${trackingOrder.status === 'delivered' ? styles.stepNodeCompleted : ''}
                      `}>
                        <div className={styles.stepIconCircle}>
                          <Truck size={20} />
                        </div>
                        <span className={styles.stepTitle}>En Camino</span>
                        <span className={styles.stepDesc}>Unidad de reparto</span>
                        <span className={styles.stepTime}>{trackingOrder.timeline[2]?.timestamp || 'Pendiente'}</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className={`
                        ${styles.stepNode} 
                        ${trackingOrder.status === 'delivered' ? styles.stepNodeCurrent : styles.stepNodeCompleted}
                      `}>
                        <div className={styles.stepIconCircle}>
                          <CheckCircle2 size={20} />
                        </div>
                        <span className={styles.stepTitle}>Entregado</span>
                        <span className={styles.stepDesc}>Recibido en destino</span>
                        <span className={styles.stepTime}>{trackingOrder.timeline[3]?.timestamp || 'Pendiente'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Status Simulator Bar */}
                  <div className={styles.simulatorBar}>
                    <div className={styles.simulatorTitle}>
                      <Play size={16} />
                      <span>Simulador de Avance de Estado en Vivo:</span>
                    </div>

                    <div className={styles.simulatorButtons}>
                      <button 
                        className={styles.simBtn}
                        onClick={() => updateOrderStatus(trackingOrder!.orderId, 'processing')}
                      >
                        1. Procesando
                      </button>
                      <button 
                        className={styles.simBtn}
                        onClick={() => updateOrderStatus(trackingOrder!.orderId, 'packed')}
                      >
                        2. Empaquetar
                      </button>
                      <button 
                        className={styles.simBtn}
                        onClick={() => updateOrderStatus(trackingOrder!.orderId, 'shipped')}
                      >
                        3. Enviar
                      </button>
                      <button 
                        className={styles.simBtn}
                        onClick={() => updateOrderStatus(trackingOrder!.orderId, 'delivered')}
                      >
                        4. Entregar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No se encontró ninguna orden con el código o número ingresado.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Printable Receipt Overlay Modal */}
        {selectedReceiptOrder && (
          <div className={styles.receiptOverlay} onClick={() => setSelectedReceiptOrder(null)}>
            <div className={styles.receiptCard} onClick={e => e.stopPropagation()}>
              <div className={styles.receiptHeader}>
                <div>
                  <div className={styles.receiptBrand}>NexusStore</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Comprobante Oficial de Compra</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{selectedReceiptOrder.orderId}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedReceiptOrder.date}</div>
                </div>
              </div>

              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Cliente: </strong> 
                <span>{selectedReceiptOrder.customerName} ({selectedReceiptOrder.customerEmail})</span>
                <br />
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Dirección: </strong> 
                <span>{selectedReceiptOrder.address}, {selectedReceiptOrder.city}</span>
              </div>

              <table className={styles.receiptTable}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>P. Unit</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReceiptOrder.items.map((item: CartItem, idx: number) => (
                    <tr key={idx}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td>${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.receiptTotalRow}>
                <span>TOTAL PAGADO</span>
                <span>${selectedReceiptOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className={styles.receiptActions}>
                <button 
                  className={styles.btnSecondary}
                  style={{ color: '#0f172a', borderColor: '#cbd5e1' }}
                  onClick={() => setSelectedReceiptOrder(null)}
                >
                  Cerrar
                </button>
                <button 
                  className={styles.btnPrimary}
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Imprimir Recibo</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
