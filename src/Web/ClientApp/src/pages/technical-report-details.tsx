import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import axios from "axios";

interface TechnicalReport {
  id: string;
  title: string;
  technicianName: string;
  createdAt: string; // Consider changing this to a Date type if it's a date string
  content: string;
}

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
    direction: "rtl",
    fontSize: 10,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "black",
    textAlign: "center",
    backgroundColor: "#d3d0d0",
  },
  subTitle: {
    fontSize: 12,
    flexDirection: "row-reverse",
    gap: 10,
    textAlign: "right",
  },
  content: {
    fontSize: 14,
    marginTop: 20,
  },
  flexRowReverse: {
    fontSize: 14,
    flexDirection: "row-reverse",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  ml1: {
    marginLeft: "2pt",
  },
});

const fetchTechnicalReport = async (id: string): Promise<TechnicalReport> => {
  try {
    const response = await axios.get<TechnicalReport>(
      `http://localhost:5001/technicalreports/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching technical report:", error);
    throw error; // Throw the error to let react-query handle it
  }
};

const TechnicalReportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: technicalReport,
    isLoading,
    isError,
  } = useQuery<TechnicalReport>(
    ["technicalReport", id],
    () => fetchTechnicalReport(id!),
    {
      enabled: !!id,
    }
  );

  const [splitedText, setSplitedText] = useState<string[]>([""]);
  useEffect(() => {
    if (technicalReport) {
      const _splitedText = technicalReport.content.split(" ");
      setSplitedText(_splitedText);
    }
  }, [technicalReport]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !technicalReport) {
    // If there's an error or technical report doesn't exist, use fake data
    return (
      <PDFViewer className="min-h-screen w-full">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>تقرير غير موجود</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  return (
    <PDFViewer className="min-h-screen w-full">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row-reverse",
                gap: 10,
                justifyContent: "center",
                backgroundColor: "#ddd",
                fontSize: 16,
              }}
            >
              <Text>تقرير فني رقم </Text>
              <Text>({technicalReport.id})</Text>
            </View>
            <Text style={styles.title}>{technicalReport.title}</Text>
            <Text style={styles.subTitle}>
              <Text>{technicalReport.technicianName}</Text>
              <Text>اسم الفني: </Text>
            </Text>
            <Text style={{ textAlign: "right", fontSize: "12px" }}>
              <Text>
                {new Date(technicalReport.createdAt).toLocaleString()}
              </Text>
              <Text> التاريخ: </Text>
            </Text>
          </View>
          <View style={[styles.flexRowReverse, styles.flexWrap]}>
            {splitedText.map((word, i) => (
              <Text style={styles.ml1} key={i}>
                {word}
              </Text>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TechnicalReportDetails;
