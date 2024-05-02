import * as React from "react";
import {
  Document,
  Page,
  Text as Text,
  View,
  StyleSheet,
  Font,
  PDFViewer,
  Link,
} from "@react-pdf/renderer";

export type TechnicalReport = {
  id: string;
  title: string;
  technicianName: string;
  createdAt: Date;
};

Font.register({
  family: "Cairo",
  src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-W1Q.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Cairo",
    fontSize: 8,
  },
  header: {
    marginBottom: 20,
    direction: "ltr",
    backgroundColor: "#ddd",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "black",
    fontFamily: "Cairo",
  },

  rtlContainer: {
    flexDirection: "column",
    textAlign: "right",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 0.3,
  },
  tableRow: {
    flexDirection: "row-reverse",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderTop: 0.3,
    borderLeft: 0.3,
    padding: 8,
    textAlign: "center",
    fontFamily: "Cairo",
  },
  linkCell: {
    flex: 1,
    borderStyle: "solid",
    borderTop: 0.3,
    borderLeft: 0.3,
    padding: 8,
    textAlign: "center",
    fontFamily: "Cairo",
    color: "blue",
    textDecoration: "underline",
  },
});

const TableHeader: React.FC = () => (
  <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
    <Text style={styles.tableCell}>رقم التقرير</Text>
    <Text style={styles.tableCell}>التاريخ </Text>
    <Text style={styles.tableCell}>عنوان التقرير</Text>
    <Text style={styles.tableCell}>اسم الفني</Text>
    <Text style={styles.tableCell}>التفاصيل</Text>
  </View>
);

const TableRow: React.FC<TechnicalReport> = ({
  id,
  title,
  technicianName,
  createdAt,
}) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{id}</Text>
    <Text style={[styles.tableCell]}>
      {new Date(createdAt).toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })}
    </Text>
    <Text style={styles.tableCell}>{title}</Text>
    <Text style={styles.tableCell}>{technicianName}</Text>
    <Text style={styles.linkCell}>
      <Link src={`http://localhost:5173/technical-reports/${id}`}>
        التفاصيل
      </Link>
    </Text>
  </View>
);

export const TechnicalReportsTableAsPdf: React.FC<{
  reports: TechnicalReport[];
  currentUsername?: string;
}> = ({ reports, currentUsername }) => {
  return (
    <PDFViewer className="min-h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}> قائمة التقارير الفنية</Text>
            <Text
              style={{ fontWeight: "bold", color: "black", fontSize: "12px" }}
            >
              السفارة السعودية بالقاهرة
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: "10px" }}>
              {!currentUsername
                ? `تم الإصدار من مسؤول النظام : "محمد عبد الله العمري" `
                : currentUsername}
            </Text>
            <Text
              style={{
                flexDirection: "row",
                fontSize: "12px",
                fontWeight: "black",
              }}
            >
              {new Date().toLocaleString("en-US", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
              تاريخ الإصدار:{" "}
            </Text>
          </View>
          <View style={styles.rtlContainer}>
            {/* Table Header */}

            <View style={styles.table}>
              {/* Table Rows */}
              <TableHeader />
              {reports?.map((report, index) => (
                <View key={index} style={styles.table}>
                  <TableRow {...report} />
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
