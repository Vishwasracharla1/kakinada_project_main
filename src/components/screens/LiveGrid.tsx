



import React from 'react';
import { Cpu, Filter, Play } from 'lucide-react';

// Operator clips – H.264 encoded versions
import op1 from '../../assets/videos/op1_h264.mp4';
import op2 from '../../assets/videos/op2_h264.mp4';
import op3 from '../../assets/videos/op3_h264.mp4';
import op4 from '../../assets/videos/op4_h264.mp4';
import op5 from '../../assets/videos/op5_h264.mp4';
import op7 from '../../assets/videos/op7_h264.mp4';
import op9 from '../../assets/videos/op9_h264.mp4';
import op10 from '../../assets/videos/op10_h264.mp4';

interface LiveGridProps {
  onViewCamera: (camera: Camera) => void;
}

export type CameraStatus = 'Live' | 'degraded' | 'offline';

export interface Camera {
  id: string;
  name: string;
  zone: string;
  status: CameraStatus;
  aiEnabled: boolean;
  videoUrl: string;
}

// pool of videos used across the grid
const opVideos = [op1, op2, op3, op4, op5, op7, op9, op10];

export function LiveGrid({ onViewCamera }: LiveGridProps) {
  // 16 cameras cycling through the OP clips
  const cameras = React.useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: `CAM-${String.fromCharCode(65 + Math.floor(i / 4))}Z-${String(
          i + 1
        ).padStart(3, '0')}`,
        name: `Camera ${i + 1}`,
        zone: [
          'North Zone',
          'South Zone',
          'East Zone',
          'West Zone',
          'Central Zone',
        ][Math.floor(Math.random() * 5)],
        status: (['Live', 'Live', 'Live', 'degraded', 'offline'][
          Math.floor(Math.random() * 5)
        ] ?? 'Live') as CameraStatus,
        aiEnabled: Math.random() > 0.3,
        videoUrl: opVideos[i % opVideos.length],
      })),
    []
  );

  const getStatusColor = (status: CameraStatus) => {
    switch (status) {
      case 'Live':
        return 'border-green-500';
      case 'degraded':
        return 'border-yellow-500';
      case 'offline':
        return 'border-gray-600';
      default:
        return 'border-red-500';
    }
  };

  const getStatusBg = (status: CameraStatus) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/20 text-green-400';
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'offline':
        return 'bg-gray-600/20 text-gray-400';
      default:
        return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="bg-black text-sm text-white outline-none">
            <option>All Zones</option>
            <option>North Zone</option>
            <option>South Zone</option>
            <option>East Zone</option>
            <option>West Zone</option>
            <option>Central Zone</option>
          </select>
        </div>

        <button className="ml-auto px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          AI Overlay: ON
        </button>
      </div>

      {/* 4x4 Camera Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            onClick={() => onViewCamera(camera)}
            className={`bg-[#0d1117] border-2 ${getStatusColor(
              camera.status
            )} rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500 transition-all group`}
          >
            {/* Video */}
            <div className="relative aspect-video bg-black">
              <video
                src={camera.videoUrl}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />

              {/* AI Badge */}
              {camera.aiEnabled && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 text-white rounded text-[10px] flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  AI
                </div>
              )}

              {/* Status Badge */}
              <div
                className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] ${getStatusBg(
                  camera.status
                )}`}
              >
                {camera.status.toUpperCase()}
              </div>

              {/* View Live Hover Button */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-1.5 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600 flex items-center justify-center gap-1">
                  <Play className="w-3 h-3" />
                  View Live
                </button>
              </div>
            </div>

            {/* Camera Info */}

            {/* Camera Info */}
            <div className="p-3 border-t border-[#1f2937]">
              <p className="text-sm text-white mb-1">{camera.id}</p>
              <p className="text-xs text-gray-500">{camera.zone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}








// import React from 'react';
// import { Cpu, Filter, Play } from 'lucide-react';

// // Load all videos dynamically
// const videoModules = import.meta.glob('/src/assets/videos/*.mp4', { eager: true });
// const videoList = Object.values(videoModules).map((v: any) => v.default);

// interface LiveGridProps {
//   onViewCamera: () => void;
// }

// type CameraStatus = 'Live' | 'degraded' | 'offline';

// export function LiveGrid({ onViewCamera }: LiveGridProps) {
//   // Assign videos in order (loop if fewer videos than cameras)
//   const cameras = React.useMemo(
//     () =>
//       Array.from({ length: 16 }, (_, i) => ({
//         id: `CAM-${String.fromCharCode(65 + Math.floor(i / 4))}Z-${String(
//           i + 1
//         ).padStart(3, '0')}`,
//         name: `Camera ${i + 1}`,
//         zone: [
//           'North Zone',
//           'South Zone',
//           'East Zone',
//           'West Zone',
//           'Central Zone',
//         ][Math.floor(Math.random() * 5)],
//         status: (['Live', 'Live', 'Live', 'degraded', 'offline'][
//           Math.floor(Math.random() * 5)
//         ] ?? 'Live') as CameraStatus,
//         aiEnabled: Math.random() > 0.3,
//         videoUrl: videoList[i % videoList.length], // Assign videos properly
//       })),
//     []
//   );

//   const getStatusColor = (status: CameraStatus) => {
//     switch (status) {
//       case 'Live':
//         return 'border-green-500';
//       case 'degraded':
//         return 'border-yellow-500';
//       case 'offline':
//         return 'border-gray-600';
//       default:
//         return 'border-red-500';
//     }
//   };

//   const getStatusBg = (status: CameraStatus) => {
//     switch (status) {
//       case 'Live':
//         return 'bg-red-500 text-white-400';
//       case 'degraded':
//         return 'bg-yellow-500/20 text-yellow-400';
//       case 'offline':
//         return 'bg-gray-600/20 text-gray-400';
//       default:
//         return 'bg-red-500/20 text-red-400';
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Filters */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
//           <Filter className="w-4 h-4 text-gray-500" />
//           <select className="bg-black text-sm text-white outline-none">
//             <option>All Zones</option>
//             <option>North Zone</option>
//             <option>South Zone</option>
//             <option>East Zone</option>
//             <option>West Zone</option>
//             <option>Central Zone</option>
//           </select>
//         </div>

//         <button className="ml-auto px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 flex items-center gap-2">
//           <Cpu className="w-4 h-4" />
//           AI Overlay: ON
//         </button>
//       </div>

//       {/* 4x4 Camera Grid */}
//       <div className="grid grid-cols-4 gap-4">
//         {cameras.map((camera) => (
//           <div
//             key={camera.id}
//             onClick={onViewCamera}
//             className={`bg-[#0d1117] border-2 ${getStatusColor(
//               camera.status
//             )} rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500 transition-all group`}
//           >
//             {/* Video */}
//             <div className="relative aspect-video bg-black">
//               <video
//                 src={camera.videoUrl}
//                 autoPlay
//                 muted
//                 loop
//                 className="w-full h-full object-cover"
//               />

//               {/* AI Badge */}
//               {camera.aiEnabled && (
//                 <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 text-white rounded text-[10px] flex items-center gap-1">
//                   <Cpu className="w-3 h-3" />
//                   AI
//                 </div>
//               )}

//               {/* Status Badge */}
//               <div
//                 className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] ${getStatusBg(
//                   camera.status
//                 )}`}
//               >
//                 {camera.status.toUpperCase()}
//               </div>

//               {/* View Live Hover Button */}
//               <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button className="w-full py-1.5 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600 flex items-center justify-center gap-1">
//                   <Play className="w-3 h-3" />
//                   View Live
//                 </button>
//               </div>
//             </div>

//             {/* Camera Info */}
//             <div className="p-3 border-t border-[#1f2937]">
//               <p className="text-sm text-white mb-1">{camera.id}</p>
//               <p className="text-xs text-gray-500">{camera.zone}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// import React from 'react';
// import { Cpu, Filter, Play } from 'lucide-react';

// // Load all videos dynamically
// const videoModules = import.meta.glob('/src/assets/videos/*.mp4', { eager: true });
// const videoList = Object.values(videoModules).map((v: any) => v.default);

// interface LiveGridProps {
//   onViewCamera: () => void;
// }

// type CameraStatus = 'Live' | 'degraded' | 'offline';

// export function LiveGrid({ onViewCamera }: LiveGridProps) {
//   // Assign videos in order (loop if fewer videos than cameras)
//   const cameras = React.useMemo(
//     () =>
//       Array.from({ length: 16 }, (_, i) => ({
//         id: `CAM-${String.fromCharCode(65 + Math.floor(i / 4))}Z-${String(
//           i + 1
//         ).padStart(3, '0')}`,
//         name: `Camera ${i + 1}`,
//         zone: [
//           'North Zone',
//           'South Zone',
//           'East Zone',
//           'West Zone',
//           'Central Zone',
//         ][Math.floor(Math.random() * 5)],
//         status: (['Live', 'Live', 'Live', 'degraded', 'offline'][
//           Math.floor(Math.random() * 5)
//         ] ?? 'Live') as CameraStatus,
//         aiEnabled: Math.random() > 0.3,
//         videoUrl: videoList[i % videoList.length], // Assign videos properly
//       })),
//     []
//   );

//   const getStatusColor = (status: CameraStatus) => {
//     switch (status) {
//       case 'Live':
//         return 'border-green-500';
//       case 'degraded':
//         return 'border-yellow-500';
//       case 'offline':
//         return 'border-gray-600';
//       default:
//         return 'border-red-500';
//     }
//   };

//   const getStatusBg = (status: CameraStatus) => {
//     switch (status) {
//       case 'Live':
//         return 'bg-red-500 text-white-400';
//       case 'degraded':
//         return 'bg-yellow-500/20 text-yellow-400';
//       case 'offline':
//         return 'bg-gray-600/20 text-gray-400';
//       default:
//         return 'bg-red-500/20 text-red-400';
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Filters */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
//           <Filter className="w-4 h-4 text-gray-500" />
//           <select className="bg-black text-sm text-white outline-none">
//             <option>All Zones</option>
//             <option>North Zone</option>
//             <option>South Zone</option>
//             <option>East Zone</option>
//             <option>West Zone</option>
//             <option>Central Zone</option>
//           </select>
//         </div>

//         <button className="ml-auto px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 flex items-center gap-2">
//           <Cpu className="w-4 h-4" />
//           AI Overlay: ON
//         </button>
//       </div>

//       {/* 4x4 Camera Grid */}
//       <div className="grid grid-cols-4 gap-4">
//         {cameras.map((camera) => (
//           <div
//             key={camera.id}
//             onClick={onViewCamera}
//             className={`bg-[#0d1117] border-2 ${getStatusColor(
//               camera.status
//             )} rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500 transition-all group`}
//           >
//             {/* Video */}
//             <div className="relative aspect-video bg-black">
//               <video
//                 src={camera.videoUrl}
//                 autoPlay
//                 muted
//                 loop
//                 className="w-full h-full object-cover"
//               />

//               {/* AI Badge */}
//               {camera.aiEnabled && (
//                 <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 text-white rounded text-[10px] flex items-center gap-1">
//                   <Cpu className="w-3 h-3" />
//                   AI
//                 </div>
//               )}

//               {/* Status Badge */}
//               <div
//                 className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] ${getStatusBg(
//                   camera.status
//                 )}`}
//               >
//                 {camera.status.toUpperCase()}
//               </div>

//               {/* View Live Hover Button */}
//               <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button className="w-full py-1.5 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600 flex items-center justify-center gap-1">
//                   <Play className="w-3 h-3" />
//                   View Live
//                 </button>
//               </div>
//             </div>

//             {/* Camera Info */}
//             <div className="p-3 border-t border-[#1f2937]">
//               <p className="text-sm text-white mb-1">{camera.id}</p>
//               <p className="text-xs text-gray-500">{camera.zone}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
