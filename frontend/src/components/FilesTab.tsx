import React from 'react';
import { FileText, Image, Download, Share } from 'lucide-react';
import { FileItem } from '../types';

interface FilesTabProps {
  files: FileItem[];
}

const FilesTab: React.FC<FilesTabProps> = ({ files }) => {
  const getFileIcon = (type: string) => {
    if (type.includes('image')) {
      return <Image size={20} className="text-blue-500" />;
    }
    return <FileText size={20} className="text-gray-500" />;
  };

  return (
    <div className="flex-1 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Shared Files</h3>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <Share size={16} />
          <span>Share</span>
        </button>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-12">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No files shared yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
            <div className="col-span-1">Type</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Shared on</div>
            <div className="col-span-3">Sent by</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Files */}
          {files.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-12 gap-4 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="col-span-1 flex items-center">
                {getFileIcon(file.type)}
              </div>
              <div className="col-span-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
              <div className="col-span-3 text-sm text-gray-600">
                {file.sharedOn}
              </div>
              <div className="col-span-3 text-sm text-gray-600">
                {file.sharedBy}
              </div>
              <div className="col-span-1">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesTab;