import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

interface Project {
  id: string;
  name: string;
  department: string;
  division: string;
  projectType: string;
  rank: string;
  pm: string;
  sales: number;
  startDate: string;
  endDate: string;
  remarks?: string;
  pl?: string;
}

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/project/edit/${project.id}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: API call to delete project
    console.log('Deleting project:', project.id);
    setIsDeleteModalOpen(false);
    navigate('/');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">プロジェクト詳細</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">事業部/部門</label>
              <p className="text-gray-900">{project.department} / {project.division}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PJ名</label>
              <p className="text-gray-900">{project.name}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">P種別</label>
              <p className="text-gray-900">{project.projectType}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">売上高(千円)</label>
              <p className="text-gray-900">{project.sales.toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PM</label>
              <p className="text-gray-900">{project.pm}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">開始日</label>
              <p className="text-gray-900">{project.startDate}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">備考</label>
              <p className="text-gray-900">{project.remarks || '---'}</p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PJ分類</label>
              <p className="text-gray-900">{project.rank}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">開発言語1（言語）</label>
              <p className="text-gray-900">---</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PL</label>
              <p className="text-gray-900">{project.pl || '---'}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">リーダー1</label>
              <p className="text-gray-900">---</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">終了日</label>
              <p className="text-gray-900">{project.endDate}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            戻る
          </button>
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            削除
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="プロジェクトの削除"
        message="このプロジェクトを削除してもよろしいですか？"
        confirmText="削除"
        cancelText="キャンセル"
      />
    </div>
  );
};

export default ProjectDetail;
