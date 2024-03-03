// import { PipelineStage } from 'mongoose';
// import { IFilters } from '../../../core/abstracts/filters/filter.abstract';
//
// export const calculateTotals = (filtersProvided: IFilters): PipelineStage => {
//   const rangeFilters = ['price', 'pagesCount', 'copies', 'datePublished'];
//   return (
//     {
//       $match: filtersProvided,
//     },
//     {
//       $facet: {
//         categoryStats: [
//           {
//             $group: {
//               _id: { fieldType: 'category', fieldName: '$category' },
//               totalBooks: { $sum: 1 },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 fieldName: '$_id.fieldName',
//                 total: '$totalBooks',
//               },
//             },
//           },
//         ],
//         languageStats: [
//           {
//             $group: {
//               _id: { fieldType: 'language', fieldName: '$language' },
//               totalBooks: { $sum: 1 },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 fieldName: '$_id.fieldName',
//                 total: '$totalBooks',
//               },
//             },
//           },
//         ],
//         priceStats: [
//           {
//             $group: {
//               _id: { fieldType: 'price' },
//               maxPrice: { $max: '$price' },
//               minPrice: { $min: '$price' },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 max: '$maxPrice',
//                 min: '$minPrice',
//               },
//             },
//           },
//         ],
//         copiesStats: [
//           {
//             $group: {
//               _id: { fieldType: 'copies' },
//               maxCopies: { $max: '$copies' },
//               minCopies: { $min: '$copies' },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 max: '$maxCopies',
//                 min: '$minCopies',
//               },
//             },
//           },
//         ],
//         pagesCountStats: [
//           {
//             $group: {
//               _id: { fieldType: 'pagesCount' },
//               maxPageCount: { $max: '$pagesCount' },
//               minPageCount: { $min: '$pagesCount' },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 max: '$maxPageCount',
//                 min: '$minPageCount',
//               },
//             },
//           },
//         ],
//         datePublishedStats: [
//           {
//             $group: {
//               _id: { fieldType: 'datePublished' },
//               maxDatePublished: { $max: '$datePublished' },
//               minDatePublished: { $min: '$datePublished' },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               field: {
//                 fieldType: '$_id.fieldType',
//                 max: '$maxDatePublished',
//                 min: '$minDatePublished',
//               },
//             },
//           },
//         ],
//       },
//     },
//     {
//       $project: {
//         stats: {
//           $concatArrays: [
//             '$categoryStats',
//             '$languageStats',
//             '$priceStats',
//             '$copiesStats',
//             '$pagesCountStats',
//             '$datePublishedStats',
//           ],
//         },
//       },
//     },
//     {
//       $unwind: '$stats',
//     },
//     {
//       $replaceWith: '$stats',
//     }
//   );
// };
