// // CRUD

// class LevelRepository {
//   async create(level) {
//     const newLevel = await _levelModel.default.create(level);
//     return newLevel;
//   }

//   async update(level) {
//     const updatedLevel = await _levelModel.default.findByIdAndUpdate(
//       level._id,
//       level,
//       {
//         new: true,
//       }
//     );
//     return updatedLevel;
//   }

//   async delete(id) {
//     const deletedLevel = await _levelModel.default.findByIdAndDelete(id);
//     return deletedLevel;
//   }

//   async findAll() {
//     const levels = await _levelModel.default.find();
//     return levels;
//   }

//   async findById(id) {
//     const level = await _levelModel.default.findById(id);
//     return level;
//   }
// }
