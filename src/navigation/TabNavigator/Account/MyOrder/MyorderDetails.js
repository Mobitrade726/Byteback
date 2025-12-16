import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../../constants/Header';
import {
  fetchOrderDetailsAPI,
  fetchSalesInvoiceAPI,
  fetchOrderStatusLogsAPI,
} from '../../../../redux/slices/orderSlice';
import { createAndSharePDF } from '../../../../screens/Home/Invoice';
import { moderateScale } from 'react-native-size-matters';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import ActivityLoader from '../../../../constants/Loader';

const { width, height } = Dimensions.get('window');
const wp = p => (width * p) / 100;
const hp = p => (height * p) / 100;

const MyorderDetails = ({ navigation, route }) => {
  const { order_id, order_id_Number, params, from } = route.params || {};
  const dispatch = useDispatch();
  const {
    orderDetails = {},
    invoiceData,
    loading,
  } = useSelector(state => state.orders);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [returnModal, setReturnModal] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  useEffect(() => {
    if (order_id && order_id_Number) {
      dispatch(fetchOrderDetailsAPI(order_id));
      dispatch(fetchOrderStatusLogsAPI(order_id_Number));
    }
  }, [dispatch, order_id, order_id_Number]);

  const downloadInvoice = async id => {
    try {
      setInvoiceLoading(true);
      await dispatch(fetchSalesInvoiceAPI(id));
      // // small delay to ensure invoiceData updated in store
      // setTimeout(() => {
      //   if (invoiceData) {
      //     createAndSharePDF(invoiceData);
      //   }
      //   setInvoiceLoading(false);
      // }, 400);
      navigation.navigate('Invoice', { invoiceData: invoiceData });
    } catch (err) {
      setInvoiceLoading(false);
    }
  };

  if (loading) {
    return <ActivityLoader />;
  }

  // safe values
  const statusName = orderDetails?.order_status ?? '--';
  const items = orderDetails?.item_details ?? [];
  const bill = orderDetails?.checkout_detail ?? {};

  const statusConfig = {
    Delivered: {
      icon: require('../../../../../assets/images/orderdelever.png'),
      tintColor: '#4CAF50', // green
    },
    'Order Placed': {
      icon: require('../../../../../assets/images/package.png'),
      tintColor: '#2196F3', // blue
    },
    Cancelled: {
      icon: require('../../../../../assets/images/cancle.png'),
      tintColor: '#CB444B', // red
    },
    'Ready for Dispacth': {
      icon: require('../../../../../assets/images/shiped.png'),
      tintColor: '#11A5D7', // orange
    },
  };

  const StatusIcon = ({ statusName }) => {
    const status = statusConfig[statusName] || {};
    if (!status.icon) return null;

    return (
      <View style={styles.statusRight}>
        <Image
          source={status.icon}
          style={[styles.statusImage, { tintColor: status.tintColor , resizeMode:'contain'}]}
        />
      </View>
    );
  };

  const STATUS_COLORS = {
    Pending: {
      bg: '#FFF7ED',
      text: '#EA580C',
      border: '#FDBA74',
    },
    Confirmed: {
      bg: '#ECFEFF',
      text: '#0891B2',
      border: '#67E8F9',
    },
    Shipped: {
      bg: '#EFF6FF',
      text: '#2563EB',
      border: '#93C5FD',
    },
    Delivered: {
      bg: '#ECFDF5',
      text: '#059669',
      border: '#6EE7B7',
    },
    Cancelled: {
      bg: '#FEF2F2',
      text: '#DC2626',
      border: '#FCA5A5',
    },
  };

  const getStatusColor = status =>
    STATUS_COLORS[status] || {
      bg: '#F3F4F6',
      text: '#374151',
      border: '#D1D5DB',
    };
  const statusColor = getStatusColor(statusName);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title={`#${orderDetails?.order_id_Number ?? order_id_Number ?? ''}`}
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* STATUS CARD */}
        {/* <View style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>{statusName}</Text>
            <Text style={styles.orderTime}>
              {orderDetails?.order_date_time ?? ''}
            </Text>
          </View>
          <StatusIcon statusName={statusName} />
        </View> */}
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: statusColor.bg,
              borderColor: statusColor.border,
            },
          ]}
        >
          <View style={styles.statusLeft}>
            <Text style={styles.statusLabel}>Status</Text>

            <Text style={[styles.statusValue, { color: statusColor.text }]}>
              {statusName}
            </Text>

            <Text style={styles.orderTime}>
              {orderDetails?.order_date_time ?? ''}
            </Text>
          </View>

          <StatusIcon statusName={statusName} color={statusColor.text} />
        </View>
        {/* ORDER / TRACK */}
        <View style={styles.row}>
          <View style={styles.infoCard}>
            <Text style={styles.infoSmall}>Order Number</Text>
            <Text style={styles.infoBold}>#{order_id_Number ?? '—'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoSmall}>Tracking</Text>
            <Text style={styles.infoBold}>
              {orderDetails?.awb_details ?? 'Not available'}
            </Text>
          </View>
        </View>
        {/* RM */}
        <View style={styles.rmCard}>
          <View style={styles.rmLeft}>
            <Ionicons
              name="person-circle"
              size={moderateScale(44)}
              color="#0A84FF"
            />
          </View>
          <View style={styles.rmCenter}>
            <Text style={styles.rmTitle}>Relationship Manager</Text>
            <Text style={styles.rmName}>
              {orderDetails?.relationship_manager_name ?? '—'}
            </Text>
            <Text style={styles.rmText}>
              {orderDetails?.relationship_manager_email ?? ''}
            </Text>
          </View>
          <View style={styles.rmRight}>
            <Pressable
              onPress={() => {
                const phone = orderDetails?.relationship_manager_number;
                if (phone) navigation.navigate('DialerScreen', { phone });
              }}
              style={styles.callBtn}
            >
              <Ionicons name="call" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>
        {/* ADDRESS */}
        <View style={styles.addressCard}>
          <Ionicons name="location" size={20} color="#333" />
          <View style={{ marginLeft: wp(3), flex: 1 }}>
            <Text style={styles.addressLabel}>Deliver to</Text>
            <Text style={styles.addressText}>
              {orderDetails?.buyer_address ?? '—'}
            </Text>
          </View>
        </View>
        {/* Product List */}
        <Text style={styles.sectionTitle}>Product list</Text>
        {items.map((product, i) => (
          <View key={i} style={styles.productRow}>
            <View style={styles.productInfo}>
              <Text style={styles.grade}>Grade {product?.grade ?? '—'}</Text>
              <Text style={styles.returnBtnText}>
                {product?.barcode_number?.barcode_number ?? '—'}
              </Text>
              <Text numberOfLines={2} style={styles.productTitle}>
                {product?.model_name ?? 'Product'}
              </Text>
              <Text style={styles.productPrice}>₹{product?.price ?? '0'}</Text>
              {/* {orderDetails?.order_status_value === '5' && (
                <TouchableOpacity
                  // onPress={() => setReturnModal(true)}
                  onPress={() => {
                    setSelectedProduct(product); // ⭐ YEH IMPORTANT
                    setReturnModal(true);
                  }}
                  style={styles.returnBtn}
                >
                  <Text style={styles.returnBtnText}>Request Return</Text>
                </TouchableOpacity>
              )} */}
              {[5, 12].includes(Number(orderDetails?.order_status_value)) && (
                <>
                  {Number(product?.sales_return_status) === 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedProduct(product);
                        setReturnModal(true);
                      }}
                      style={styles.returnBtn}
                    >
                      <Text style={styles.returnBtnText}>Request Return</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={[styles.returnBtn, { backgroundColor: '#BEBEBE' }]}
                    >
                      <Text style={[styles.returnBtnText, { color: '#fff' }]}>
                        Request Return
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>

            <Image
              source={{ uri: product?.model_image }}
              style={styles.productImage}
              // source={require('../../../../../assets/images/orderdelever.png')}
              defaultSource={require('../../../../../assets/images/orderdelever.png')}
            />
          </View>
        ))}
        {/* Bill Details */}
        <View style={styles.billCard}>
          {(orderDetails?.bill_details ?? []).map((b, idx) => (
            <View style={styles.billRow} key={idx}>
              <Text style={styles.billLeft}>{b.model_name}</Text>
              <Text style={styles.billRight}>₹{b.price}</Text>
            </View>
          ))}
          <Text style={{ fontSize: responsiveHeight(1.8), fontWeight: '600' }}>
            Bill details
          </Text>
          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>
              ₹
              {Number(bill?.amount_before_tax || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>GST</Text>
            <Text style={styles.priceValue}>
              ₹
              {(Number(orderDetails?.checkout_detail?.igst_tax_amount) > 0
                ? Number(orderDetails?.checkout_detail?.igst_tax_amount)
                : Number(orderDetails?.checkout_detail?.cgst_tax_amount || 0) +
                  Number(orderDetails?.checkout_detail?.sgst_tax_amount || 0)
              )
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { fontWeight: '800' }]}>
              Total
            </Text>
            <Text style={[styles.priceValue, { fontWeight: '800' }]}>
              ₹
              {Number(bill?.grand_total || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
        {/* Sticky Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TrackOrder', { order_id, order_id_Number })
            }
            style={[
              styles.footerBtn,
              { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' },
            ]}
          >
            <Ionicons name="locate" size={18} color="#333" />
            <Text style={[styles.footerBtnText, { color: '#333' }]}>Track</Text>
          </TouchableOpacity>

          {[5, 12].includes(Number(orderDetails?.order_status_value)) && (
            <TouchableOpacity
              onPress={() => downloadInvoice(order_id_Number)}
              style={[styles.footerBtn, { backgroundColor: '#1C9C48' }]}
            >
              <>
                <Ionicons name="download" size={18} color="#fff" />
                <Text style={[styles.footerBtnText, { color: '#fff' }]}>
                  Invoice
                </Text>
              </>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: hp(12) }} />
      </ScrollView>

      {/* Return Modal */}
      <Modal
        visible={returnModal}
        transparent
        animationType="fade"
        onRequestClose={() => setReturnModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="help-circle" size={36} color="#3FAE49" />
            </View>
            <Text style={styles.modalTitle}>Request return</Text>
            <Text style={styles.modalMsg}>
              Are you sure you want to request a return for this item?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setReturnModal(false)}
                style={styles.modalCancel}
              >
                <Text style={styles.modalCancelText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setReturnModal(false);
                  navigation.navigate('ReturnRequest', {
                    barcodeId: selectedProduct?.barcode_id,
                    invoiceId: selectedProduct?.invoice_id,
                    delivery_type_option: selectedProduct?.delivery_type_option,
                  });
                }}
                style={styles.modalConfirm}
              >
                <Text style={styles.modalConfirmText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyorderDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },

  container: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    paddingTop: hp(1),
  },

  loaderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F6FF',
  },

  /* ----------------------------- STATUS CARD ---------------------------- */
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  statusValue: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 4,
  },

  orderTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  orderTime: {
    fontSize: wp(3.2),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  statusRight: {
    width: wp(22),
    alignItems: 'flex-end',
  },
  statusImage: {
    width: wp(12),
    height: wp(12),
    tintColor: '#000',
  },
  statusImage1: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
    tintColor: 'red',
  },

  /* ----------------------------- ORDER + TRACK ---------------------------- */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),

    shadowColor: '#A5B4FC',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: wp(1),
  },
  infoSmall: {
    color: '#6B7280',
    fontSize: wp(3),
    fontWeight: '500',
  },
  infoBold: {
    fontWeight: '800',
    fontSize: wp(4),
    marginTop: hp(0.4),
    color: '#111827',
  },

  /* ----------------------------- RM CARD ---------------------------- */
  rmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#93C5FD',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 5,
    marginVertical: hp(1.5),
  },
  rmCenter: { flex: 1 },
  rmTitle: {
    fontSize: wp(3.2),
    fontWeight: '700',
    color: '#1F2937',
  },
  rmName: {
    color: '#2563EB',
    fontWeight: '800',
    marginTop: hp(0.2),
  },
  rmText: {
    color: '#6B7280',
    marginTop: hp(0.4),
  },
  callBtn: {
    backgroundColor: '#10B981',
    padding: wp(2.2),
    borderRadius: wp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ----------------------------- ADDRESS ---------------------------- */
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'flex-start',

    shadowColor: '#A5B4FC',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: hp(2),
  },
  addressLabel: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: wp(3.2),
  },
  addressText: {
    fontWeight: '700',
    marginTop: hp(0.4),
    color: '#111827',
    fontSize: wp(3.8),
  },

  /* ----------------------------- PRODUCT LIST ---------------------------- */
  sectionTitle: {
    fontSize: wp(4.6),
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: hp(1),
  },
  productRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(3),
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#C7D2FE',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: hp(1.4),
  },
  productInfo: { flex: 1, paddingRight: wp(3) },
  grade: {
    color: '#6B7280',
    fontSize: wp(3.1),
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  priceLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },

  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

  productTitle: {
    fontSize: wp(4),
    fontWeight: '800',
    color: '#111827',
    marginTop: hp(0.3),
  },
  productPrice: {
    fontSize: wp(4),
    fontWeight: '800',
    color: '#2563EB',
    marginTop: hp(0.4),
  },
  productImage: {
    width: wp(23),
    height: wp(23),
    borderRadius: wp(2),
    resizeMode: 'contain',
  },
  returnBtn: {
    marginTop: hp(1),
    alignSelf: 'flex-start',
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#0EA5E9',
    backgroundColor: '#F0F9FF',
  },
  returnBtnText: {
    color: '#0284C7',
    fontWeight: '700',
  },

  /* ----------------------------- BILL DETAILS ---------------------------- */
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(3.5),

    shadowColor: '#C7D2FE',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    marginTop: hp(1),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.6),
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: hp(1.2),
  },
  priceLabel: { color: '#6B7280', fontWeight: '600' },
  priceValue: { fontWeight: '900', color: '#111827' },

  /* ----------------------------- FOOTER ---------------------------- */
  footer: {
    position: 'absolute',
    bottom: hp(2),
    left: wp(4),
    right: wp(4),
    marginBottom: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(4),
  },
  footerBtn: {
    flex: 1,
    height: hp(6.8),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: wp(2),
    shadowColor: '#A7F3D0',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  footerBtnText: {
    fontWeight: '900',
    fontSize: wp(3.8),
  },

  /* ----------------------------- MODAL ---------------------------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    padding: wp(5),
    borderRadius: wp(4),
    alignItems: 'center',

    shadowColor: '#93C5FD',
    elevation: 6,
  },
  modalIconWrap: {
    backgroundColor: '#E0F2FE',
    padding: wp(3),
    borderRadius: wp(6),
    marginBottom: hp(1),
  },
  modalTitle: {
    fontSize: wp(4.6),
    fontWeight: '800',
    color: '#1E3A8A',
  },
  modalMsg: {
    textAlign: 'center',
    color: '#6B7280',
    marginVertical: hp(1.2),
    fontSize: wp(3.5),
  },
  modalActions: {
    flexDirection: 'row',
    gap: wp(4),
    marginTop: hp(1.5),
  },
  modalCancel: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  modalCancelText: { color: '#374151', fontWeight: '700' },
  modalConfirm: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#10B981',
  },
  modalConfirmText: { color: '#fff', fontWeight: '800' },
});
