import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const ProjectRegistration = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessUnit: '',
    projectName: '',
    projectType: '',
    customer: '',
    sales: '',
    pm: '',
    pl: '',
    startDate: '',
    endDate: '',
    rank: 'S',
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // TODO: API call to save project
    console.log('Saving project:', formData);
    setIsModalOpen(false);
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomerSelect = () => {
    // ダミーの顧客選択
    setFormData(prev => ({
      ...prev,
      customer: 'サンプル顧客株式会社'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">プロジェクト登録</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <label className="w-32 text-sm pt-1">
              事業部/部門*
            </label>
            <div className="w-[500px]">
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              >
                <option value="">選択してください</option>
                <option value="A事業本部">A事業本部</option>
                <option value="B事業本部">B事業本部</option>
                <option value="C事業本部">C事業本部</option>
              </select>
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              PJ名*
            </label>
            <div className="w-[500px]">
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              PJ種別*
            </label>
            <div className="w-[500px]">
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              >
                <option value="">選択してください</option>
                <option value="新規開発PJ">新規開発PJ</option>
                <option value="保守開発PJ">保守開発PJ</option>
                <option value="ERP導入支援">ERP導入支援</option>
                <option value="保守PJ">保守PJ</option>
              </select>
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              顧客*
            </label>
            <div className="w-[500px] flex gap-2">
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
                readOnly
              />
              <button
                type="button"
                onClick={handleCustomerSelect}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm"
              >
                選択
              </button>
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              売上高(千円)*
            </label>
            <div className="w-[500px]">
              <input
                type="number"
                name="sales"
                value={formData.sales}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              PM*
            </label>
            <div className="w-[500px]">
              <input
                type="text"
                name="pm"
                value={formData.pm}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              PL*
            </label>
            <div className="w-[500px]">
              <input
                type="text"
                name="pl"
                value={formData.pl}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              開始日*
            </label>
            <div className="w-[500px]">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              終了日*
            </label>
            <div className="w-[500px]">
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-64 border rounded p-1"
                required
              />
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              ランク*
            </label>
            <div className="w-[500px]">
              <div className="flex gap-4">
                {['SS', 'S', 'A', 'B', 'C', 'D'].map((rank) => (
                  <label key={rank} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="rank"
                      value={rank}
                      checked={formData.rank === rank}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="text-sm">{rank}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex">
            <label className="w-32 text-sm pt-1">
              備考
            </label>
            <div className="w-[500px]">
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full border rounded p-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-1 rounded text-sm hover:bg-gray-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-1 rounded text-sm hover:bg-blue-700"
            >
              登録
            </button>
          </div>
        </form>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title="入力内容の確認"
          message="以下の内容で登録してよろしいですか？"
          confirmText="登録"
          cancelText="キャンセル"
          projectData={formData}
        />
      </div>
    </div>
  );
};

export default ProjectRegistration;
