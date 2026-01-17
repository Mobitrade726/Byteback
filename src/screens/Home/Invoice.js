// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Button,
//   StyleSheet,
//   InteractionManager,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { captureRef } from 'react-native-view-shot';
// import { PDFDocument } from 'pdf-lib';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { Buffer } from 'buffer';
// import ActivityLoader from '../../constants/Loader';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AlertModal from '../../constants/AlertModal';
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSalesInvoiceAPI } from '../../redux/slices/orderSlice';
// const screenWidth = Dimensions.get('window').width;

// export default function InvoiceScreen({ route, navigation }) {
//   const [alertVisible, setAlertVisible] = React.useState(false);
//   const [alertMessage, setAlertMessage] = React.useState('');
//   const [loading1, setLoading] = useState(true);
//   const invoiceRef = useRef();

//   const SCREEN_WIDTH = Dimensions.get('window').width;
//   const A4_RATIO = 1.414;

//   // ✅ State data
//   // const [invoiceData, setInvoiceData] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState('');

//   // useFocusEffect(
//   //   useCallback(() => {
//   //     if (routeInvoiceData && routeInvoiceData?.items?.length) {
//   //       setInvoiceData(routeInvoiceData);
//   //       setLoading(false);
//   //       setError('');
//   //     } else {
//   //       setLoading(false);
//   //       setError('Invoice data load nahi ho paaya. Please try again.');
//   //     }

//   //     // cleanup (optional)
//   //     return () => {};
//   //   }, [routeInvoiceData]),
//   // );

//   // // ⛔ Jab tak loading → loader
//   // if (!invoiceData && loading) {
//   //   return <ActivityLoader />;
//   // }

//   const { invoiceId } = route.params || {};
//   const { invoiceData, loading } = useSelector(state => state.orders);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (invoiceId) {
//       dispatch(fetchSalesInvoiceAPI(invoiceId));
//     }
//   }, [dispatch, invoiceId]);

//   if (loading || !invoiceData) {
//     return <ActivityLoader />;
//   }

//   // if (loading1) {
//   //   return <ActivityIndicator />;
//   // }

//   const generatePDF = async imgBase64 => {
//     const pdfDoc = await PDFDocument.create();
//     const pngImage = await pdfDoc.embedPng(imgBase64);

//     const A4_WIDTH = 595.28;
//     const A4_HEIGHT = 841.89;

//     const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

//     const scale = Math.min(
//       A4_WIDTH / pngImage.width,
//       A4_HEIGHT / pngImage.height,
//     );

//     const imgWidth = pngImage.width * scale;
//     const imgHeight = pngImage.height * scale;

//     page.drawImage(pngImage, {
//       x: (A4_WIDTH - imgWidth) / 2,
//       y: A4_HEIGHT - imgHeight,
//       width: imgWidth,
//       height: imgHeight,
//     });

//     const pdfBytes = await pdfDoc.save();
//     const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

//     const pdfPath = `${RNFS.CachesDirectoryPath}/${invoiceData.invoice_details.invoice_number}.pdf`;

//     await RNFS.writeFile(pdfPath, pdfBase64, 'base64');

//     await Share.open({
//       url: `file://${pdfPath}`,
//       type: 'application/pdf',
//       failOnCancel: false,
//     });
//   };

//   const handleDownloadPDF = async () => {
//     // ❌ DATA NOT LOADED
//     if (!invoiceData || !invoiceData?.items?.length) {
//       setAlertMessage('Invoice data is not loaded yet. Please try again.');
//       setAlertVisible(true);
//       return;
//     }
//     InteractionManager.runAfterInteractions(async () => {
//       try {
//         setLoading(true);

//         const imgBase64 = await captureRef(invoiceRef, {
//           format: 'png',
//           quality: 1,
//           result: 'base64', // 👈 RNFS READ HATAO
//         });

//         await generatePDF(imgBase64);
//       } catch (error) {
//         console.log('Capture Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     });
//   };

//   const totalTax =
//     Number(invoiceData?.summary?.total_cgst || 0) +
//     Number(invoiceData?.summary?.total_sgst || 0) +
//     Number(invoiceData?.summary?.total_igst || 0);

//   return (
// <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
//   <ScrollView
//     showsVerticalScrollIndicator={false}
//     style={{ flex: 1, backgroundColor: '#f5f5f5' }}
//   >
//     <View
//       collapsable={false}
//       style={{
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         padding: moderateScale(5),
//       }}
//     >
//       <TouchableOpacity
//         style={{ marginTop: moderateScale(0) }}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={moderateScale(20)} color="#000" />
//       </TouchableOpacity>
//       <Text
//         style={{
//           fontSize: moderateScale(14),
//           fontWeight: '600',
//           marginLeft: moderateScale(10),
//         }}
//       >
//         Back
//       </Text>
//     </View>
//     <View
//       ref={invoiceRef}
//       collapsable={false}
//       style={{
//         width: SCREEN_WIDTH - 16,
//         minHeight: (SCREEN_WIDTH - 16) * A4_RATIO,
//         alignSelf: 'center',
//         backgroundColor: '#fff',
//         padding: 12,
//       }}
//     >
//       {/* HEADER */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'flex-start',
//           alignItems: 'center',
//         }}
//       >
//         <View style={styles.logoWrapper}>
//           <Image
//             source={require('../../../assets/images/Logo.jpeg')}
//             style={styles.logo}
//           />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.companyName}>
//             {invoiceData?.company_details?.regd_company_details}
//           </Text>
//           <Text style={styles.addressText}>
//             Warehouse Address : {invoiceData?.warehouse_details?.address}
//           </Text>
//           {/* <Text style={styles.addressText}>
//             Registered Address: {invoiceData?.company_details?.regd_address}
//           </Text> */}
//           <Text style={styles.addressText}>
//             Website : {invoiceData?.company_details?.company_website} |
//             Email:
//             {invoiceData?.company_details?.email} | Phone:
//             {invoiceData?.company_details?.phone}
//           </Text>
//           <Text style={styles.smallText}>
//             CIN: {invoiceData?.company_details?.company_cin}
//           </Text>
//           <Text style={styles.smallText}>GSTIN: 09AABC53150L1Z7</Text>
//         </View>
//       </View>

//       <Text style={styles.taxInvoice}>Tax Invoice</Text>

//       {/* BILL / SHIP TO */}
//       <View style={styles.rowBetween}>
//         <View style={styles.box}>
//           <Text style={styles.boxTitle}>Bill To</Text>
//           <Text
//             style={[
//               styles.text,
//               { fontWeight: 'bold', fontSize: moderateScale(5) },
//             ]}
//           >
//             {invoiceData?.bill_to?.name}
//           </Text>
//           <Text style={styles.text}>{invoiceData?.bill_to?.address}</Text>
//           <Text style={styles.text}>
//             Phone: {invoiceData?.bill_to?.phone}
//           </Text>
//           <Text style={styles.text}>
//             Email: {invoiceData?.bill_to?.email}
//           </Text>
//           <Text style={styles.text}>
//             GSTIN: {invoiceData?.bill_to?.gstin}
//           </Text>
//           <Text style={styles.text}>PAN: {invoiceData?.bill_to?.pan}</Text>
//           <Text style={styles.text}>
//             Place of Supply: {invoiceData?.bill_to?.place_of_supply}
//           </Text>
//           <Text style={styles.text}>
//             State Code: {invoiceData?.bill_to?.state_code}
//           </Text>
//         </View>

//         <View style={styles.box}>
//           <Text style={styles.boxTitle}>Ship To</Text>
//           <Text
//             style={[
//               styles.text,
//               { fontWeight: 'bold', fontSize: moderateScale(5) },
//             ]}
//           >
//             {invoiceData?.ship_to?.name}
//           </Text>
//           <Text style={styles.text}>{invoiceData?.ship_to?.address}</Text>
//           <Text style={styles.text}>
//             Phone: {invoiceData?.ship_to?.phone}
//           </Text>
//           <Text style={styles.text}>
//             Email: {invoiceData?.ship_to?.email}
//           </Text>
//           <Text style={styles.text}>
//             GSTIN: {invoiceData?.ship_to?.gstin}
//           </Text>
//           <Text style={styles.text}>PAN: {invoiceData?.ship_to?.pan}</Text>
//           <Text style={styles.text}>
//             Place of Supply: {invoiceData?.ship_to?.place_of_supply}
//           </Text>
//           <Text style={styles.text}>
//             State Code: {invoiceData?.ship_to?.state_code}
//           </Text>
//         </View>

//         <View style={[styles.box, { marginTop: '1%' }]}>
//           <Text
//             style={[styles.text1, { marginVertical: moderateScale(5) }]}
//           >
//             Invoice No: {invoiceData?.invoice_details?.invoice_number}
//           </Text>
//           <Text
//             style={[styles.text1, { marginVertical: moderateScale(5) }]}
//           >
//             Invoice Date: {invoiceData?.invoice_details?.invoice_date}
//           </Text>
//           <Text
//             style={[styles.text1, { marginVertical: moderateScale(5) }]}
//           >
//             Total Quantity: {invoiceData?.invoice_details?.total_quantity}
//           </Text>
//           <Text
//             style={[
//               styles.text1,
//               {
//                 fontWeight: 'bold',
//                 fontSize: moderateScale(5),
//                 marginTop: moderateScale(5),
//               },
//             ]}
//           >
//             Emp Code: {invoiceData?.invoice_details?.emp_code}
//           </Text>
//         </View>
//       </View>

//       {/* PRODUCT TABLE */}
//       <View style={styles.tableWrapper}>
//         {/* Table Header */}
//         <View style={styles.tableHeader}>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 0.6,
//                 width: moderateScale(20),
//               },
//             ]}
//           >
//             S.No.
//           </Text>
//           <Text style={[styles.th, { flex: 2, width: moderateScale(35) }]}>
//             Description
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.5,
//                 width: moderateScale(35),
//               },
//             ]}
//           >
//             IMEI/ SN
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.5,
//                 width: moderateScale(35),
//               },
//             ]}
//           >
//             Barcode
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 0.7,
//                 width: moderateScale(22),
//               },
//             ]}
//           >
//             Grade
//           </Text>
//           <Text style={[styles.th, { flex: 1, width: moderateScale(35) }]}>
//             HSN
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 0.7,
//                 width: moderateScale(20),
//               },
//             ]}
//           >
//             Qty
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.5,
//                 width: moderateScale(35),
//               },
//             ]}
//           >
//             Price(Rs)
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.2,
//                 width: moderateScale(22),
//               },
//             ]}
//           >
//             CGST(9%)
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.2,
//                 width: moderateScale(20),
//               },
//             ]}
//           >
//             SGST(9%)
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.2,
//                 width: moderateScale(20),
//               },
//             ]}
//           >
//             IGST(18%)
//           </Text>
//           <Text
//             style={[
//               styles.th,
//               {
//                 flex: 1.5,
//                 width: moderateScale(40),
//               },
//             ]}
//           >
//             Amount(Rs)
//           </Text>
//         </View>

//         {/* Table Rows */}
//         {invoiceData?.items?.map((row, index) => (
//           <View
//             style={[
//               styles.tableRow,
//               { backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }, // alternate row color
//             ]}
//             key={index}
//           >
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 0.6,
//                   width: moderateScale(20),
//                 },
//               ]}
//             >
//               {row.s_no}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 2,
//                   width: moderateScale(35),
//                 },
//               ]}
//             >
//               {row.description}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.5,
//                   width: moderateScale(35),
//                 },
//               ]}
//             >
//               {row.imei}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.5,
//                   width: moderateScale(35),
//                 },
//               ]}
//             >
//               {row.barcode}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 0.7,
//                   width: moderateScale(22),
//                 },
//               ]}
//             >
//               {row.grade}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1,
//                   width: moderateScale(35),
//                 },
//               ]}
//             >
//               {row.hsn}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 0.7,
//                   width: moderateScale(20),
//                 },
//               ]}
//             >
//               {row.qty}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.5,
//                   width: moderateScale(35),
//                 },
//               ]}
//             >
//               {row.s_no}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.2,
//                   width: moderateScale(22),
//                 },
//               ]}
//             >
//               {invoiceData?.summary?.total_cgst}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.2,
//                   width: moderateScale(20),
//                 },
//               ]}
//             >
//               {invoiceData?.summary?.total_sgst}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.2,
//                   width: moderateScale(20),
//                 },
//               ]}
//             >
//               {invoiceData?.summary?.total_igst}
//             </Text>
//             <Text
//               style={[
//                 styles.td,
//                 {
//                   flex: 1.5,
//                   width: moderateScale(40),
//                 },
//               ]}
//             >
//               {totalTax}
//             </Text>
//           </View>
//         ))}

//         {/* ===== TABLE FOOTER (RIGHT SIDE) ===== */}
//         <View style={{ width: '100%' }}>
//           {[
//             {
//               label: 'Total before tax',
//               value: invoiceData?.summary?.total_before_tax,
//             },
//             {
//               label: 'Total CGST (9%)',
//               value: invoiceData?.summary?.total_cgst,
//             },
//             {
//               label: 'Total SGST (9%)',
//               value: invoiceData?.summary?.total_sgst,
//             },
//             {
//               label: 'Total IGST (18%)',
//               value: invoiceData?.summary?.total_igst,
//             },
//             {
//               label: 'Grand Total',
//               value: invoiceData?.summary?.grand_total,
//               amount_in_words: invoiceData?.summary?.amount_in_words,
//             },
//           ].map((item, index) => (
//             <>
//               <View key={index} style={styles.footerRoww}>
//                 {item?.amount_in_words ? (
//                   <Text style={styles.tdd}>
//                     Amount in Words : {item?.amount_in_words}
//                   </Text>
//                 ) : null}
//                 <Text style={styles.thh}>{item.label}</Text>
//                 <Text style={styles.tdd}>
//                   {item?.word}₹ {item.value}
//                 </Text>
//               </View>
//             </>
//           ))}
//         </View>
//       </View>

//       {/* TAX BIFURCATION */}
//       <Text style={styles.note}>
//         Note: Whether tax payable under reverse charge - NO
//       </Text>

//       <Text style={styles.footer}>Thank You for Business.</Text>

//       <View
//         style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//       >
//         <View style={{ width: '60%', marginBottom: moderateScale(5) }}>
//           <Text style={styles.termsTitle}>Terms & Conditions</Text>
//           <Text style={styles.termsText}>
//             1. Goods once sold cannot be returned and the buyer assumes all
//             responsibility of goods once taken out of Seller's premises
//             physically by Buyer's representative(s)
//           </Text>
//           <Text style={styles.termsText}>
//             2. Buyer agrees to save and hold seller harmless from any
//             claims, demands , liabilities, costs, expenses or judgement
//             arising in whole or in part, directly or indirectly, out of the
//             negligence of Buyer involving the goods supplied by Seller
//           </Text>
//         </View>
//         <View
//           style={{
//             marginRight: moderateScale(50),
//             marginTop: moderateScale(-8),
//           }}
//         >
//           <Text
//             style={{
//               fontSize: moderateScale(5),
//               textAlign: 'center',
//               fontWeight: '600',
//             }}
//           >
//             For ByteBack Pvt. Ltd.
//           </Text>
//           <Image
//             source={require('../../../assets/images/sign.jpg')}
//             style={styles.logoStamp}
//           />
//           <Text
//             style={{
//               fontSize: scale(5),
//               textAlign: 'center',
//               fontWeight: '600',
//             }}
//           >
//             Authorized Signatory
//           </Text>
//         </View>
//       </View>
//     </View>

//     {/* Download / Share PDF Button */}
//     <View style={{ marginVertical: 20 }}>
//       {loading && <ActivityLoader />}

//       <Button
//         title="Download / Share PDF"
//         onPress={handleDownloadPDF}
//         disabled={!invoiceData || loading}
//       />

//       <AlertModal
//         visible={alertVisible}
//         title="Error"
//         message={alertMessage}
//         type="error"
//         onOk={() => setAlertVisible(false)}
//         onClose={() => setAlertVisible(false)}
//       />
//     </View>
//   </ScrollView>
// </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   logoWrapper: {
//     justifyContent: 'center',
//   },
//   logo: {
//     width: scale(100),
//     height: scale(30),
//     resizeMode: 'center',
//     // alignSelf: 'center',
//   },
//   logoStamp: {
//     width: scale(50),
//     height: scale(50),
//     resizeMode: 'center',
//     // alignSelf: 'center',
//   },
//   companyName: {
//     fontSize: moderateScale(8),
//     fontWeight: '700',
//     marginVertical: verticalScale(8),
//     textAlign: 'right',
//   },
//   addressText: {
//     fontSize: moderateScale(6),
//     marginBottom: verticalScale(2),
//     textAlign: 'right',
//     flexWrap: 'wrap',
//     flexShrink: 1,
//   },
//   smallText: {
//     fontSize: moderateScale(6),
//     textAlign: 'right',
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(10),
//   },
//   taxInvoice: {
//     textAlign: 'center',
//     fontSize: moderateScale(10),
//     fontWeight: '500',
//     marginVertical: verticalScale(8),
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     padding: moderateScale(5),
//     borderColor: '#ccc',
//     color: '#1C9C48',
//   },
//   box: {
//     // width: '35%',
//     // padding: moderateScale(10),
//     borderColor: '#ccc',
//     // borderRadius: 6,
//   },
//   boxTitle: { fontSize: moderateScale(6), marginBottom: 6 },
//   text: { fontSize: moderateScale(5), marginBottom: 2 },
//   text1: { fontSize: moderateScale(5), marginBottom: 2, textAlign: 'right' },
//   tableWrapper: {
//     marginTop: verticalScale(0),
//   },
//   tableHeader: { flexDirection: 'row', backgroundColor: '#f1f1f1', padding: 5 },
//   th: { flex: 1, fontWeight: '700', fontSize: moderateScale(4) },

//   tableRow: {
//     flexDirection: 'row',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   td: { flex: 1, fontSize: moderateScale(4) },

//   thh: {
//     flex: 1,
//     fontSize: moderateScale(4),
//     textAlign: 'right',
//   },
//   tdd: {
//     fontSize: moderateScale(4),
//     textAlign: 'right',
//     marginRight: moderateScale(15),
//   },
//   totalRow: {
//     borderWidth: 1,
//     borderColor: '#444',
//     flexDirection: 'row',
//     padding: 10,
//     justifyContent: 'space-between',
//   },
//   totalText: { fontSize: moderateScale(8), fontWeight: '600' },
//   note: {
//     fontSize: moderateScale(5),
//     marginVertical: verticalScale(6),
//     fontWeight: 'bold',
//   },
//   taxTable: { borderWidth: 1, borderColor: '#444' },
//   taxHeader: { flexDirection: 'row', backgroundColor: '#e5e5e5', padding: 8 },
//   taxRow: { flexDirection: 'row', padding: 8 },
//   footer: {
//     marginTop: verticalScale(0),
//     fontSize: moderateScale(5),
//   },
//   termsTitle: {
//     fontWeight: '700',
//     marginTop: verticalScale(10),
//     marginBottom: moderateScale(2),
//     fontSize: moderateScale(6),
//   },
//   termsText: {
//     fontSize: moderateScale(5),
//     marginBottom: 2,
//   },
//   tableFooterWrapper: {
//     borderWidth: 1,
//   },

//   footerRow: {
//     flexDirection: 'row',
//     paddingVertical: 4,
//     borderTopWidth: 0.5,
//   },
//   footerRoww: {
//     flexDirection: 'row',
//     paddingVertical: 4,
//     borderBottomWidth: 1,
//     borderColor: '#f1f1f1',
//     alignSelf: 'flex-end',
//     gap: 8,
//   },

//   footerLabel: {
//     fontSize: 12,
//     color: '#444',
//     fontWeight: '500',
//   },

//   footerValue: {
//     fontSize: 12,
//     color: '#000',
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  InteractionManager,
  TouchableOpacity,
  Dimensions,
  Button,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { captureRef } from 'react-native-view-shot';
import { PDFDocument } from 'pdf-lib';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Buffer } from 'buffer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertModal from '../../constants/AlertModal';
import ActivityLoader from '../../constants/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesInvoiceAPI } from '../../redux/slices/orderSlice';

const SCREEN_WIDTH = Dimensions.get('window').width;
const A4_RATIO = 1.414;

export default function InvoiceScreen({ route, navigation }) {
  const invoiceRef = useRef();
  const dispatch = useDispatch();

  /** ✅ local states */
  const [pdfLoading, setPdfLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /** ✅ route param */
  const { invoiceId } = route.params || {};

  /** ✅ redux state (RENAMED loading) */
  const { invoiceData, loading: invoiceLoading } = useSelector(
    state => state.orders,
  );

  /** ✅ fetch invoice on first load */
  useEffect(() => {
    if (invoiceId) {
      dispatch(fetchSalesInvoiceAPI(invoiceId));
    }
  }, [dispatch, invoiceId]);

  /** ✅ SCREEN LOADER (FIRST TIME FIX) */
  if (invoiceLoading || !invoiceData) {
    return <ActivityLoader />;
  }

  /** ✅ PDF GENERATION */
  const generatePDF = async imgBase64 => {
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(imgBase64);

    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;

    const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

    const scaleFactor = Math.min(
      A4_WIDTH / pngImage.width,
      A4_HEIGHT / pngImage.height,
    );

    page.drawImage(pngImage, {
      x: (A4_WIDTH - pngImage.width * scaleFactor) / 2,
      y: A4_HEIGHT - pngImage.height * scaleFactor,
      width: pngImage.width * scaleFactor,
      height: pngImage.height * scaleFactor,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    const pdfPath = `${RNFS.CachesDirectoryPath}/${invoiceData.invoice_details.invoice_number}.pdf`;

    await RNFS.writeFile(pdfPath, pdfBase64, 'base64');

    await Share.open({
      url: `file://${pdfPath}`,
      type: 'application/pdf',
      failOnCancel: false,
    });
  };

  /** ✅ DOWNLOAD HANDLER (LOADER FIXED) */
  const handleDownloadPDF = async () => {
    setPdfLoading(true);

    if (!invoiceData || !invoiceData?.items?.length) {
      setPdfLoading(false);
      setAlertMessage('Invoice data is not loaded yet. Please try again.');
      setAlertVisible(true);
      return;
    }

    InteractionManager.runAfterInteractions(async () => {
      try {
        const imgBase64 = await captureRef(invoiceRef, {
          format: 'png',
          quality: 1,
          result: 'base64',
        });

        await generatePDF(imgBase64);
      } catch (error) {
        console.log('PDF Error:', error);
      } finally {
        setPdfLoading(false);
      }
    });
  };

  const totalTax =
    Number(invoiceData?.summary?.total_cgst || 0) +
    Number(invoiceData?.summary?.total_sgst || 0) +
    Number(invoiceData?.summary?.total_igst || 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      >
        <View
          collapsable={false}
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
          }}
        >
          <TouchableOpacity
            style={{ marginTop: moderateScale(0), marginLeft: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={moderateScale(15)} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: moderateScale(10),
              fontWeight: '600',
              marginLeft: moderateScale(5),
            }}
          >
            Back
          </Text>
        </View>
        <View
          ref={invoiceRef}
          collapsable={false}
          style={{
            width: SCREEN_WIDTH - 16,
            minHeight: (SCREEN_WIDTH - 16) * A4_RATIO,
            alignSelf: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../../assets/images/Logo.jpeg')}
                style={styles.logo}
                resizeMode='contain'
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyName}>
                {invoiceData?.company_details?.regd_company_details}
              </Text>
              <Text style={styles.addressText}>
                Warehouse Address : {invoiceData?.warehouse_details?.address}
              </Text>
              {/* <Text style={styles.addressText}>
                Registered Address: {invoiceData?.company_details?.regd_address}
              </Text> */}
              <Text style={styles.addressText}>
                Website : {invoiceData?.company_details?.company_website} |
                Email:
                {invoiceData?.company_details?.email} | Phone:
                {invoiceData?.company_details?.phone}
              </Text>
              <Text style={styles.smallText}>
                CIN: {invoiceData?.company_details?.company_cin}
              </Text>
              <Text style={styles.smallText}>GSTIN: 09AABC53150L1Z7</Text>
            </View>
          </View>

          <Text style={styles.taxInvoice}>Tax Invoice</Text>

          {/* BILL / SHIP TO */}
          <View style={styles.rowBetween}>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>Bill To</Text>
              <Text
                style={[
                  styles.text,
                  { fontWeight: 'bold', fontSize: moderateScale(5) },
                ]}
              >
                {invoiceData?.bill_to?.name}
              </Text>
              <Text style={styles.text}>{invoiceData?.bill_to?.address}</Text>
              <Text style={styles.text}>
                Phone: {invoiceData?.bill_to?.phone}
              </Text>
              <Text style={styles.text}>
                Email: {invoiceData?.bill_to?.email}
              </Text>
              <Text style={styles.text}>
                GSTIN: {invoiceData?.bill_to?.gstin}
              </Text>
              <Text style={styles.text}>PAN: {invoiceData?.bill_to?.pan}</Text>
              <Text style={styles.text}>
                Place of Supply: {invoiceData?.bill_to?.place_of_supply}
              </Text>
              <Text style={styles.text}>
                State Code: {invoiceData?.bill_to?.state_code}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.boxTitle}>Ship To</Text>
              <Text
                style={[
                  styles.text,
                  { fontWeight: 'bold', fontSize: moderateScale(5) },
                ]}
              >
                {invoiceData?.ship_to?.name}
              </Text>
              <Text style={styles.text}>{invoiceData?.ship_to?.address}</Text>
              <Text style={styles.text}>
                Phone: {invoiceData?.ship_to?.phone}
              </Text>
              <Text style={styles.text}>
                Email: {invoiceData?.ship_to?.email}
              </Text>
              <Text style={styles.text}>
                GSTIN: {invoiceData?.ship_to?.gstin}
              </Text>
              <Text style={styles.text}>PAN: {invoiceData?.ship_to?.pan}</Text>
              <Text style={styles.text}>
                Place of Supply: {invoiceData?.ship_to?.place_of_supply}
              </Text>
              <Text style={styles.text}>
                State Code: {invoiceData?.ship_to?.state_code}
              </Text>
            </View>

            <View style={[styles.box, { marginTop: '1%' }]}>
              <Text
                style={[styles.text1, { marginVertical: moderateScale(5) }]}
              >
                Invoice No: {invoiceData?.invoice_details?.invoice_number}
              </Text>
              <Text
                style={[styles.text1, { marginVertical: moderateScale(5) }]}
              >
                Invoice Date: {invoiceData?.invoice_details?.invoice_date}
              </Text>
              <Text
                style={[styles.text1, { marginVertical: moderateScale(5) }]}
              >
                Total Quantity: {invoiceData?.invoice_details?.total_quantity}
              </Text>
              <Text
                style={[
                  styles.text1,
                  {
                    fontWeight: 'bold',
                    fontSize: moderateScale(5),
                    marginTop: moderateScale(5),
                  },
                ]}
              >
                Emp Code: {invoiceData?.invoice_details?.emp_code}
              </Text>
              <Text
                style={[
                  styles.text1,
                  {
                    fontWeight: 'bold',
                    fontSize: moderateScale(5),
                    marginTop: moderateScale(5),
                  },
                ]}
              >
                Payment Mode: {invoiceData?.invoice_details?.payment_mode || 'Prepaid'}
              </Text>
            </View>
          </View>

          {/* PRODUCT TABLE */}
          <View style={styles.tableWrapper}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 0.6,
                    width: moderateScale(20),
                  },
                ]}
              >
                S.No.
              </Text>
              <Text style={[styles.th, { flex: 2, width: moderateScale(35) }]}>
                Description
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.5,
                    width: moderateScale(35),
                  },
                ]}
              >
                IMEI/ SN
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.5,
                    width: moderateScale(35),
                  },
                ]}
              >
                Barcode
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 0.7,
                    width: moderateScale(22),
                  },
                ]}
              >
                Grade
              </Text>
              <Text style={[styles.th, { flex: 1, width: moderateScale(35) }]}>
                HSN
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 0.7,
                    width: moderateScale(20),
                  },
                ]}
              >
                Qty
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.5,
                    width: moderateScale(35),
                  },
                ]}
              >
                Price(Rs)
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.2,
                    width: moderateScale(22),
                  },
                ]}
              >
                CGST(9%)
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.2,
                    width: moderateScale(20),
                  },
                ]}
              >
                SGST(9%)
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.2,
                    width: moderateScale(20),
                  },
                ]}
              >
                IGST(18%)
              </Text>
              <Text
                style={[
                  styles.th,
                  {
                    flex: 1.5,
                    width: moderateScale(40),
                  },
                ]}
              >
                Amount(Rs)
              </Text>
            </View>

            {/* Table Rows */}
            {invoiceData?.items?.map((row, index) => (
              <View
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }, // alternate row color
                ]}
                key={index}
              >
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 0.6,
                      width: moderateScale(20),
                    },
                  ]}
                >
                  {row.s_no}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 2,
                      width: moderateScale(35),
                    },
                  ]}
                >
                  {row.description}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.5,
                      width: moderateScale(35),
                    },
                  ]}
                >
                  {row.imei}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.5,
                      width: moderateScale(35),
                    },
                  ]}
                >
                  {row.barcode}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 0.7,
                      width: moderateScale(22),
                    },
                  ]}
                >
                  {row.grade}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1,
                      width: moderateScale(35),
                    },
                  ]}
                >
                  {row.hsn}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 0.7,
                      width: moderateScale(20),
                    },
                  ]}
                >
                  {row.qty}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.5,
                      width: moderateScale(35),
                    },
                  ]}
                >
                  {row.s_no}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.2,
                      width: moderateScale(22),
                    },
                  ]}
                >
                  {invoiceData?.summary?.total_cgst}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.2,
                      width: moderateScale(20),
                    },
                  ]}
                >
                  {invoiceData?.summary?.total_sgst}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.2,
                      width: moderateScale(20),
                    },
                  ]}
                >
                  {invoiceData?.summary?.total_igst}
                </Text>
                <Text
                  style={[
                    styles.td,
                    {
                      flex: 1.5,
                      width: moderateScale(40),
                    },
                  ]}
                >
                  {totalTax}
                </Text>
              </View>
            ))}

            {/* ===== TABLE FOOTER (RIGHT SIDE) ===== */}
            <View style={{ width: '100%' }}>
              {[
                {
                  label: 'Total before tax',
                  value: invoiceData?.summary?.total_before_tax,
                },
                {
                  label: 'Total CGST (9%)',
                  value: invoiceData?.summary?.total_cgst,
                },
                {
                  label: 'Total SGST (9%)',
                  value: invoiceData?.summary?.total_sgst,
                },
                {
                  label: 'Total IGST (18%)',
                  value: invoiceData?.summary?.total_igst,
                },
                {
                  label: 'Grand Total',
                  value: invoiceData?.summary?.grand_total,
                  amount_in_words: invoiceData?.summary?.amount_in_words,
                },
              ].map((item, index) => (
                <>
                  <View key={index} style={styles.footerRoww}>
                    {item?.amount_in_words ? (
                      <Text style={styles.tdd}>
                        Amount in Words : {item?.amount_in_words}
                      </Text>
                    ) : null}
                    <Text style={styles.thh}>{item.label}</Text>
                    <Text style={styles.tdd}>
                      {item?.word}₹ {item.value}
                    </Text>
                  </View>
                </>
              ))}
            </View>
          </View>

          {/* TAX BIFURCATION */}
          <Text style={styles.note}>
            Note: Whether tax payable under reverse charge - NO
          </Text>

          <Text style={styles.footer}>Thank You for Business.</Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ width: '60%', marginBottom: moderateScale(5) }}>
              <Text style={styles.termsTitle}>Terms & Conditions</Text>
              <Text style={styles.termsText}>
                1. Goods once sold cannot be returned and the buyer assumes all
                responsibility of goods once taken out of Seller's premises
                physically by Buyer's representative(s)
              </Text>
              <Text style={styles.termsText}>
                2. Buyer agrees to save and hold seller harmless from any
                claims, demands , liabilities, costs, expenses or judgement
                arising in whole or in part, directly or indirectly, out of the
                negligence of Buyer involving the goods supplied by Seller
              </Text>
            </View>
            <View
              style={{
                marginRight: moderateScale(50),
                marginTop: moderateScale(-8),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(5),
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                For ByteBack Pvt. Ltd.
              </Text>
              <Image
                source={require('../../../assets/images/sign.jpg')}
                style={styles.logoStamp}
              />
              <Text
                style={{
                  fontSize: scale(5),
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Authorized Signatory
              </Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
              width:'95%', borderWidth:1, alignSelf:'center'
          }}
        >
          <TouchableOpacity
            onPress={handleDownloadPDF}
            disabled={!invoiceData || pdfLoading}
            style={{
              backgroundColor: pdfLoading ? '#ccc' : '#1C9C48',
              padding: 12,
              flexDirection: 'row',
            }}
          >
            {pdfLoading && (
              <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
            )}
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              {pdfLoading ? 'Processing...' : 'Download / Share PDF'}
            </Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            marginVertical: 10, // upar-niche space
            borderRadius: 8, // rounded corners
            overflow: 'hidden', // rounded corners ke liye
          }}
        >
          <TouchableOpacity
            onPress={handleDownloadPDF}
            disabled={!invoiceData || pdfLoading}
            style={{
              backgroundColor: pdfLoading ? '#ccc' : '#1C9C48',
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'center', // text + loader center
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            {pdfLoading && (
              <ActivityIndicator
                color="#fff"
                style={{ marginRight: 10 }}
                size="small"
              />
            )}
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
              {pdfLoading ? 'Processing...' : 'Download / Share PDF'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: 'center',
  },
  logo: {
    width: scale(100),
    height: scale(30),
    // alignSelf: 'center',
  },
  logoStamp: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'center',
    // alignSelf: 'center',
  },
  companyName: {
    fontSize: moderateScale(8),
    fontWeight: '700',
    marginVertical: verticalScale(8),
    textAlign: 'right',
  },
  addressText: {
    fontSize: moderateScale(6),
    marginBottom: verticalScale(2),
    textAlign: 'right',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  smallText: {
    fontSize: moderateScale(6),
    textAlign: 'right',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  taxInvoice: {
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontWeight: '500',
    marginVertical: verticalScale(8),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: moderateScale(5),
    borderColor: '#ccc',
    color: '#1C9C48',
  },
  box: {
    // width: '35%',
    // padding: moderateScale(10),
    borderColor: '#ccc',
    // borderRadius: 6,
  },
  boxTitle: { fontSize: moderateScale(6), marginBottom: 6 },
  text: { fontSize: moderateScale(5), marginBottom: 2 },
  text1: { fontSize: moderateScale(5), marginBottom: 2, textAlign: 'right' },
  tableWrapper: {
    marginTop: verticalScale(0),
  },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f1f1f1', padding: 5 },
  th: { flex: 1, fontWeight: '700', fontSize: moderateScale(4) },

  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  td: { flex: 1, fontSize: moderateScale(4) },

  thh: {
    flex: 1,
    fontSize: moderateScale(4),
    textAlign: 'right',
  },
  tdd: {
    fontSize: moderateScale(4),
    textAlign: 'right',
    marginRight: moderateScale(15),
  },
  totalRow: {
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  totalText: { fontSize: moderateScale(8), fontWeight: '600' },
  note: {
    fontSize: moderateScale(5),
    marginVertical: verticalScale(6),
    fontWeight: 'bold',
  },
  taxTable: { borderWidth: 1, borderColor: '#444' },
  taxHeader: { flexDirection: 'row', backgroundColor: '#e5e5e5', padding: 8 },
  taxRow: { flexDirection: 'row', padding: 8 },
  footer: {
    marginTop: verticalScale(0),
    fontSize: moderateScale(5),
  },
  termsTitle: {
    fontWeight: '700',
    marginTop: verticalScale(10),
    marginBottom: moderateScale(2),
    fontSize: moderateScale(6),
  },
  termsText: {
    fontSize: moderateScale(5),
    marginBottom: 2,
  },
  tableFooterWrapper: {
    borderWidth: 1,
  },

  footerRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderTopWidth: 0.5,
  },
  footerRoww: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    alignSelf: 'flex-end',
    gap: 8,
  },

  footerLabel: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },

  footerValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
});
