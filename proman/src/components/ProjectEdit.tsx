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
  pl?: string;
  sales: number;
  startDate: string;
  endDate: string;
  remarks?: string;
}

interface ProjectEditProps {
  project: Project;
}

const ProjectEdit = ({ project: initialProject }: ProjectEditProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessUnit: initialProject.department,
    projectName: initialProject.name,
    projectType: initialProject.projectType,
    sales: initialProject.sales.toString(),
    pm: initialProject.pm,
    pl: initialProject.pl || '',
    startDate: initialProject.startDate,
    endDate: initialProject.endDate,
    rank: initialProject.rank,
    remarks: initialProject.remarks || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // TODO: API call to update project
    console.log('Updating project:', formData);
    setIsModalOpen(false);
    navigate(`/project/${initialProject.id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">プロジェクト編集</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                事業部/部門
              </label>
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">選択してください</option>
                <option value="A事業本部">A事業本部</option>
                <option value="B事業本部">B事業本部</option>
                <option value="C事業本部">C事業本部</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PJ名
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                P種別
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">選択してください</option>
                <option value="新規開発PJ">新規開発PJ</option>
                <option value="保守開発PJ">保守開発PJ</option>
                <option value="ERP導入支援">ERP導入支援</option>
                <option value="保守PJ">保守PJ</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                売上高(千円)
              </label>
              <input
                type="number"
                name="sales"
                value={formData.sales}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PM
              </label>
              <input
                type="text"
                name="pm"
                value={formData.pm}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PL
              </label>
              <input
                type="text"
                name="pl"
                value={formData.pl}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                開始日
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                終了日
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ランク
              </label>
              <select
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">選択してください</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            備考
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/project/${initialProject.id}`)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            更新
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="更新内容の確認"
        message="以下の内容で更新してよろしいですか？"
        confirmText="更新"
        cancelText="キャンセル"
        projectData={formData}
      />
    </div>
  );
};

export default ProjectEdit;
