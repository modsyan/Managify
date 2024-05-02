// // CRUD

// class PeriodicReportsRepository {
//   async create(periodicReport) {
//     const newPeriodicReport = await PeriodicReportModel.create(periodicReport);
//     return newPeriodicReport;
//   }

//   async update(periodicReport) {
//     const updatedPeriodicReport = await PeriodicReportModel.findByIdAndUpdate(
//       periodicReport._id,
//       periodicReport,
//       {
//         new: true,
//       }
//     );
//     return updatedPeriodicReport;
//   }

//   async delete(id) {
//     const deletedPeriodicReport = await PeriodicReportModel.findByIdAndDelete(
//       id
//     );
//     return deletedPeriodicReport;
//   }

//   async findAll() {
//     const periodicReports = await PeriodicReportModel.find();
//     return periodicReports;
//   }

//   async findById(id) {
//     const periodicReport = await PeriodicReportModel.findById(id);
//     return periodicReport;
//   }
// }
