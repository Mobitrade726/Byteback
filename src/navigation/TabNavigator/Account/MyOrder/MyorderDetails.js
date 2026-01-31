import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../../constants/Header';
import {
  fetchOrderDetailsAPI,
  fetchSalesInvoiceAPI,
  fetchOrderStatusLogsAPI,
} from '../../../../redux/slices/orderSlice';
import { moderateScale } from 'react-native-size-matters';
import ActivityLoader from '../../../../constants/Loader';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import responsive from '../../../../constants/responsive';

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

      navigation.navigate('Invoice', {
        invoiceId: id,
      });

      setInvoiceLoading(false);
    } catch (err) {
      setInvoiceLoading(false);
    }
  };

  if (loading) {
    return <ActivityLoader />;
  }

  const handleCopy = value => {
    Clipboard.setString(value);

    Toast.show({
      type: 'success',
      text2: 'Copied to clipboard',
    });
  };

  // safe values
  const statusName = orderDetails?.order_status ?? '--';
  const items = orderDetails?.item_details ?? [];
  const bill = orderDetails?.checkout_detail ?? {};

  const statusConfig = {
    Delivered: {
      icon: require('../../../../../assets/images/orderdelever.png'),
      tintColor: '#4CAF50', // green
    },
    'Payment verified': {
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
          style={[
            styles.statusImage,
            { tintColor: status.tintColor, resizeMode: 'contain' },
          ]}
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

  const RETURN_STATUS_MAP = {
    0: { label: 'Return Requested', color: '#2563EB', bg: '#EFF6FF' },
    1: { label: 'Return Rejected', color: '#DC2626', bg: '#FEF2F2' },
    2: { label: 'Reverse Pickup Initiated', color: '#7C3AED', bg: '#F5F3FF' },
    3: { label: 'Received At Warehouse', color: '#0F766E', bg: '#ECFEFF' },
    4: { label: 'Refund Initiated', color: '#CA8A04', bg: '#FEFCE8' },
    5: { label: 'Refund Added In Wallet', color: '#059669', bg: '#ECFDF5' },
    6: { label: 'Fixing Defects', color: '#9333EA', bg: '#F5F3FF' },
    7: { label: 'Packed', color: '#0284C7', bg: '#F0F9FF' },
    8: { label: 'Ready For Dispatch', color: '#2563EB', bg: '#EFF6FF' },
    9: { label: 'Dispatched', color: '#16A34A', bg: '#ECFDF5' },
    10: { label: 'Product Returned To Buyer', color: '#15803D', bg: '#ECFDF5' },
    11: { label: 'Returned To Origin', color: '#6B7280', bg: '#F3F4F6' },
  };

  return (
    <View style={styles.safe}>
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
          {/* Order Number */}
          <View style={styles.infoCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="package" size={12} color="#6B7280" />
              <Text style={styles.infoSmall}>Order Number</Text>
            </View>

            <View style={styles.valueRow}>
              <Text style={styles.infoBold}>#{order_id_Number ?? '—'}</Text>

              {order_id_Number && (
                <TouchableOpacity
                  onPress={() => handleCopy(`#${order_id_Number}`)}
                >
                  <Ionicons name="copy-outline" size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Tracking */}
          <View style={styles.infoCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="package" size={12} color="#6B7280" />
              <Text style={styles.infoSmall}>Tracking Number</Text>
            </View>

            <View style={styles.valueRow}>
              <Text style={styles.infoBold}>
                {orderDetails?.awb_details ?? 'Not available'}
              </Text>

              {orderDetails?.awb_details && (
                <TouchableOpacity
                  onPress={() => handleCopy(orderDetails.awb_details)}
                >
                  <Ionicons name="copy-outline" size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* RM */}
        <View style={styles.rmCard}>
          <View style={styles.rmLeft}>
            <Ionicons
              name="person-circle"
              size={moderateScale(30)}
              color="#0A84FF"
            />
            <View style={styles.rmCenter}>
              <Text style={styles.rmTitle}>Relationship Manager</Text>
              <Text style={styles.rmName}>
                {orderDetails?.relationship_manager_name ?? '—'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: responsive.marginBottom(5),
              marginLeft: 3,
            }}
          >
            <Fontisto name="email" size={moderateScale(12)} color="#62748E" />
            <Text style={styles.rmemail}>
              {orderDetails?.relationship_manager_email ?? ''}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 3 }}>
            <Ionicons
              name="call-outline"
              size={moderateScale(12)}
              color="#62748E"
            />
            <Text style={styles.rmemail}>
              {orderDetails?.relationship_manager_number ?? ''}
            </Text>
          </View>
        </View>

        {/* RM Query */}
        <View style={styles.rmCard}>
          <Text style={styles.rmQuery}>Note:</Text>
          <Text style={styles.rmQueryDesc}>
            For any queries related to your order contact the relationship
            manager. Our Staff will contact you to confirm your order for
            processing after order confirmation.
          </Text>
        </View>

        {/* ADDRESS */}
        <View style={styles.addressCard}>
          <MaterialIcons
            name="share-location"
            size={moderateScale(30)}
            color="#333"
          />
          <View style={{ marginLeft: wp(1), flex: 1 }}>
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

              {[5, 12].includes(Number(orderDetails?.order_status_value)) && (
                <>
                  {product?.sales_return_status === null ||
                  product?.sales_return_status === undefined ? (
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
                    /* Agar return request ho chuka hai → STATUS SHOW */
                    <View
                      style={[
                        styles.returnStatusBadge,
                        {
                          backgroundColor:
                            RETURN_STATUS_MAP[product.sales_return_status]?.bg,
                          borderColor:
                            RETURN_STATUS_MAP[product.sales_return_status]
                              ?.color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.returnStatusText,
                          {
                            color:
                              RETURN_STATUS_MAP[product.sales_return_status]
                                ?.color,
                          },
                        ]}
                      >
                        {RETURN_STATUS_MAP[product.sales_return_status]?.label}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
            <View style={styles.productbackground}>
              <Image
                source={{ uri: product?.model_image }}
                style={styles.productImage}
                // source={require('../../../../../assets/images/orderdelever.png')}
                defaultSource={require('../../../../../assets/images/orderdelever.png')}
              />
            </View>
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
          <Text style={{ fontSize: wp(3), fontWeight: '600' }}>
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
        {/* <View style={{ height: hp(12) }} /> */}
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
    </View>
  );
};

export default MyorderDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    paddingHorizontal: wp(4),
    // paddingBottom: hp(2),
    // paddingTop: hp(1),
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
    // padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
  },

  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 10,
    marginTop: 10,
  },

  statusValue: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 10,
    // marginVertical: 4,
  },

  orderTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  statusRight: {
    // width: wp(22),
    alignItems: 'flex-end',
  },
  statusImage: {
    width: wp(8),
    height: wp(8),
    tintColor: '#000',
    right: 10,
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
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: wp(3),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),

    shadowColor: '#A5B4FC',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: wp(1),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoSmall: {
    color: '#666666',
    fontSize: responsive.fontSize(12),
    fontWeight: '500',
    marginLeft: 2,
  },
  infoBold: {
    fontSize: responsive.fontSize(14),
    marginTop: hp(0.4),
    color: '#111827',
  },

  /* ----------------------------- RM CARD ---------------------------- */
  rmCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: wp(3),
    padding: wp(3),
    shadowColor: '#93C5FD',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: moderateScale(10),
  },
  rmLeft: {
    flexDirection: 'row',
    marginBottom: responsive.marginBottom(5),
  },
  rmQuery: {
    marginBottom: responsive.marginBottom(5),
    fontSize: responsive.fontSize(10),
    fontWeight: 'bold',
  },
  rmQueryDesc: {
    marginBottom: responsive.marginBottom(5),
    fontSize: responsive.fontSize(10),
    color: '#666666',
  },
  rmCenter: { flex: 1, marginLeft: 5 },
  rmTitle: {
    fontSize: responsive.fontSize(14),
    color: '#0F172B',
  },
  rmName: {
    color: '#1447E6',
    fontSize: responsive.fontSize(12),
  },
  rmemail: {
    color: '#314158',
    fontSize: responsive.fontSize(12),
    marginLeft: 5,
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
    backgroundColor: '#EAE6E5',
    borderRadius: wp(3),
    padding: wp(3),
    flexDirection: 'row',
    shadowColor: '#A5B4FC',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#f1f1f1',
    alignItems: 'center',
  },
  addressLabel: {
    color: '#6B7280',
    fontSize: responsive.fontSize(13),
  },
  addressText: {
    fontWeight: '600',
    color: '#171D1C',
    fontSize: responsive.fontSize(14),
  },

  /* ----------------------------- PRODUCT LIST ---------------------------- */
  sectionTitle: {
    fontSize: responsive.fontSize(20),
    fontWeight: '600',
    color: '#171D1C',
    marginBottom: hp(1),
  },
  productRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowRadius: 12,
    marginBottom: hp(1.4),

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
  },
  productInfo: { flex: 1, paddingLeft: wp(3) },
  grade: {
    color: '#6B7280',
    fontSize: responsive.fontSize(12),
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  priceLabel: {
    fontSize: responsive.fontSize(12),
    color: '#444',
    fontWeight: '500',
  },

  priceValue: {
    fontSize: responsive.fontSize(12),
    color: '#000',
  },

  productTitle: {
    fontSize: responsive.fontSize(10),
    fontWeight: '800',
    color: '#111827',
  },
  productPrice: {
    fontSize: responsive.fontSize(10),
    marginTop: hp(0.4),
  },
  productbackground: {
    width: responsive.width(90),
    height: responsive.height(110),
    justifyContent: 'center',
    margin: 8,
    // borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
    backgroundColor: '#fff',

    // image shadow box
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  productImage: {
    width: responsive.width(70),
    height: responsive.height(95),
    resizeMode: 'contain',
    alignSelf: 'center',
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
    fontSize: wp(2),
  },

  /* ----------------------------- BILL DETAILS ---------------------------- */
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(3.5),
    borderWidth: 1,
    borderColor: '#f1f1f1',

    // image shadow box
    elevation: 2,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
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

  /* ----------------------------- FOOTER ---------------------------- */
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(4),
    marginVertical: wp(2),
  },
  footerBtn: {
    flex: 1,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: wp(2),
    borderWidth: 1,
    borderColor: '#f1f1f1',
    padding: moderateScale(10),
  },
  footerBtnText: {
    fontWeight: '900',
    fontSize: wp(3),
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

  returnStatusBadge: {
    marginTop: hp(1),
    alignSelf: 'flex-start',
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    borderWidth: 1,
  },

  returnStatusText: {
    fontWeight: '800',
    fontSize: wp(2),
  },
});
