import { ArrowLeft, Car, MapPin, CheckCircle, Edit3, FolderPlus, Calendar, Clock } from 'lucide-react';

interface ANPRDetailProps {
  onBack: () => void;
}

export function ANPRDetail({ onBack }: ANPRDetailProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Violations
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Plate Image */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">License Plate Detection</h3>
            </div>
            <div className="p-6">
              <div className="bg-[#0a0e1a] rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block px-12 py-6 bg-yellow-400 text-black rounded-lg mb-4">
                    <span className="text-3xl font-mono tracking-wider">AP39Z9876</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">96% Confidence</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm">Validated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Snapshot */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Vehicle Snapshot</h3>
            </div>
            <div className="aspect-video bg-[#0a0e1a] flex items-center justify-center">
              <Car className="w-24 h-24 text-gray-700" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Validate
            </button>
            <button className="flex-1 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2">
              <Edit3 className="w-5 h-5" />
              Correct OCR
            </button>
            <button className="flex-1 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2">
              <FolderPlus className="w-5 h-5" />
              Add to Evidence
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Violation Details */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Violation Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Violation ID</span>
                <span className="text-white">VL-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plate Number</span>
                <span className="text-white font-mono">AP39Z9876</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Violation Type</span>
                <span className="text-red-400">Stolen Vehicle Alert</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Severity</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm">HIGH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm">Pending Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Confidence</span>
                <span className="text-green-400">96%</span>
              </div>
            </div>
          </div>

          {/* Time & Location */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Time & Location</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-white">November 21, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-white">10:23:45 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-white">NH-16 Junction, Kakinada</p>
                </div>
              </div>
              <div className="mt-4 aspect-video bg-[#0a0e1a] rounded-lg flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Camera Info */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Camera Information</h3>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Camera ID</span>
                <span className="text-white">CAM-NH-018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Camera Type</span>
                <span className="text-white">ANPR Fixed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Zone</span>
                <span className="text-white">Highway Zone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Direction</span>
                <span className="text-white">Eastbound</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
