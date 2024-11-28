interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  projectData?: {
    businessUnit: string;
    projectName: string;
    projectType: string;
    sales: string;
    pm: string;
    pl: string;
    startDate: string;
    endDate: string;
    rank: string;
    remarks: string;
  };
}

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  cancelText,
  projectData 
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        
        {projectData ? (
          // プロジェクト登録確認用の詳細表示
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">事業部/部門:</p>
                <p>{projectData.businessUnit}</p>
              </div>
              <div>
                <p className="font-semibold">PJ名:</p>
                <p>{projectData.projectName}</p>
              </div>
              <div>
                <p className="font-semibold">PJ種別:</p>
                <p>{projectData.projectType}</p>
              </div>
              <div>
                <p className="font-semibold">売上高(千円):</p>
                <p>{projectData.sales}</p>
              </div>
              <div>
                <p className="font-semibold">PM:</p>
                <p>{projectData.pm}</p>
              </div>
              <div>
                <p className="font-semibold">PL:</p>
                <p>{projectData.pl}</p>
              </div>
              <div>
                <p className="font-semibold">開始日:</p>
                <p>{projectData.startDate}</p>
              </div>
              <div>
                <p className="font-semibold">終了日:</p>
                <p>{projectData.endDate}</p>
              </div>
              <div>
                <p className="font-semibold">ランク:</p>
                <p>{projectData.rank}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">備考:</p>
              <p>{projectData.remarks}</p>
            </div>
          </div>
        ) : (
          // 一般的な確認メッセージ
          <p className="mb-4">{message}</p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
