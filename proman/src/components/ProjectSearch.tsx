import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
}

interface SearchForm {
  department: string;
  division: string;
  projectTypes: string[];
  ranks: string[];
  salesFrom: string;
  salesTo: string;
  startDateFrom: string;
  startDateTo: string;
  endDateFrom: string;
  endDateTo: string;
  projectName: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const ProjectSearch = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchForm, setSearchForm] = useState<SearchForm>({
    department: '',
    division: '',
    projectTypes: [],
    ranks: [],
    salesFrom: '',
    salesTo: '',
    startDateFrom: '',
    startDateTo: '',
    endDateFrom: '',
    endDateTo: '',
    projectName: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchFormExpanded, setIsSearchFormExpanded] = useState(true);
  const itemsPerPage = 10;

  // ダミーデータ
  const dummyProjects: Project[] = [
    {
      id: "PROJECT-1",
      name: "プロジェクトA-1",
      department: "A事業本部",
      division: "C事業部",
      projectType: "新規開発PJ",
      rank: "S",
      pm: "マネージャー1",
      sales: 10000,
      startDate: "2019/05/01",
      endDate: "2019/12/31"
    },
    {
      id: "PROJECT-2",
      name: "プロジェクトB-2",
      department: "B事業本部",
      division: "F事業部",
      projectType: "保守開発PJ",
      rank: "S",
      pm: "マネージャー2",
      sales: 29000,
      startDate: "2019/06/20",
      endDate: "2020/01/19"
    },
    // さらにダミーデータを追加
    ...Array(18).fill(null).map((_, index) => ({
      id: `PROJECT-${index + 3}`,
      name: `プロジェクト${String.fromCharCode(67 + index)}-${index + 3}`,
      department: `${String.fromCharCode(67 + (index % 3))}事業本部`,
      division: `${String.fromCharCode(71 + (index % 5))}事業部`,
      projectType: index % 2 === 0 ? "新規開発PJ" : "保守開発PJ",
      rank: ["S", "A", "B", "C", "D"][index % 5],
      pm: `マネージャー${index + 3}`,
      sales: 10000 + (index * 5000),
      startDate: "2019/07/01",
      endDate: "2020/03/31"
    }))
  ];

  // バリデーション関数
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let hasAnyValue = false;

    // 少なくとも1つの検索条件が入力されているかチェック
    if (searchForm.department || 
        searchForm.division || 
        searchForm.projectTypes.length > 0 || 
        searchForm.ranks.length > 0 ||
        searchForm.salesFrom || 
        searchForm.salesTo || 
        searchForm.startDateFrom || 
        searchForm.startDateTo || 
        searchForm.endDateFrom || 
        searchForm.endDateTo || 
        searchForm.projectName) {
      hasAnyValue = true;
    }

    if (!hasAnyValue) {
      newErrors.general = '少なくとも1つの検索条件を入力してください。';
    }

    // 売上高のバリデーション
    if (searchForm.salesFrom || searchForm.salesTo) {
      const salesFrom = Number(searchForm.salesFrom);
      const salesTo = Number(searchForm.salesTo);

      if (searchForm.salesFrom && isNaN(salesFrom)) {
        newErrors.salesFrom = '売上高FROMは数値を入力してください。';
      }
      if (searchForm.salesTo && isNaN(salesTo)) {
        newErrors.salesTo = '売上高TOは数値を入力してください。';
      }
      if (!isNaN(salesFrom) && !isNaN(salesTo) && salesFrom > salesTo) {
        newErrors.sales = '売上高FROMはTOより小さい値を入力してください。';
      }
    }

    // 開始日のバリデーション
    if (searchForm.startDateFrom && searchForm.startDateTo) {
      if (searchForm.startDateFrom > searchForm.startDateTo) {
        newErrors.startDate = '開始日FROMはTOより前の日付を入力してください。';
      }
    }

    // 終了日のバリデーション
    if (searchForm.endDateFrom && searchForm.endDateTo) {
      if (searchForm.endDateFrom > searchForm.endDateTo) {
        newErrors.endDate = '終了日FROMはTOより前の日付を入力してください。';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 検索ハンドラー
  const handleSearch = () => {
    if (validateForm()) {
      // TODO: 実際のAPIコールはここで行う
      setSearchResults(dummyProjects);
      setHasSearched(true);
      setCurrentPage(1); // 検索時にページを1ページ目に戻す
      setIsSearchFormExpanded(false); // 検索実行時に検索条件を折りたたむ
    }
  };

  // プロジェクト詳細画面への遷移
  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  // 入力ハンドラー
  const handleInputChange = (field: keyof SearchForm, value: string | string[]) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
    // 入力時にエラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // チェックボックスハンドラー
  const handleCheckboxChange = (field: 'projectTypes' | 'ranks', value: string) => {
    setSearchForm(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  // ページネーション用の計算
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const currentProjects = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">プロジェクト検索</h2>
      
      {/* エラーメッセージ表示 */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* 検索フォーム */}
      <div className="bg-white rounded-lg shadow mb-6">
        {/* 折りたたみヘッダー */}
        <div 
          className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => setIsSearchFormExpanded(!isSearchFormExpanded)}
        >
          <h3 className="font-bold">検索条件</h3>
          <button className="text-gray-500">
            {isSearchFormExpanded ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* 検索フォームの内容 */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchFormExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 border-t">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">事業部</label>
                <select 
                  className="w-full border rounded p-2"
                  value={searchForm.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="A">A事業本部</option>
                  <option value="B">B事業本部</option>
                  <option value="C">C事業本部</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">部門</label>
                <select 
                  className="w-full border rounded p-2"
                  value={searchForm.division}
                  onChange={(e) => handleInputChange('division', e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="C">C事業部</option>
                  <option value="D">D事業部</option>
                  <option value="E">E事業部</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">P種別</label>
              <div className="flex gap-4">
                {['新規開発PJ', '保守開発PJ', 'ERP導入支援', '保守PJ'].map(type => (
                  <label key={type} className="flex items-center">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={searchForm.projectTypes.includes(type)}
                      onChange={() => handleCheckboxChange('projectTypes', type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">ランク</label>
              <div className="flex gap-4">
                {['S', 'A', 'B', 'C', 'D'].map(rank => (
                  <label key={rank} className="flex items-center">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={searchForm.ranks.includes(rank)}
                      onChange={() => handleCheckboxChange('ranks', rank)}
                    />
                    {rank}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">売上高_実績 FROM(千円)</label>
                <input 
                  type="text"
                  className={`w-full border rounded p-2 ${errors.salesFrom ? 'border-red-500' : ''}`}
                  value={searchForm.salesFrom}
                  onChange={(e) => handleInputChange('salesFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">売上高_実績 TO(千円)</label>
                <input 
                  type="text"
                  className={`w-full border rounded p-2 ${errors.salesTo ? 'border-red-500' : ''}`}
                  value={searchForm.salesTo}
                  onChange={(e) => handleInputChange('salesTo', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">開始日_FROM</label>
                <input 
                  type="date"
                  className={`w-full border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
                  value={searchForm.startDateFrom}
                  onChange={(e) => handleInputChange('startDateFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">開始日_TO</label>
                <input 
                  type="date"
                  className={`w-full border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
                  value={searchForm.startDateTo}
                  onChange={(e) => handleInputChange('startDateTo', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">終了日_FROM</label>
                <input 
                  type="date"
                  className={`w-full border rounded p-2 ${errors.endDate ? 'border-red-500' : ''}`}
                  value={searchForm.endDateFrom}
                  onChange={(e) => handleInputChange('endDateFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">終了日_TO</label>
                <input 
                  type="date"
                  className={`w-full border rounded p-2 ${errors.endDate ? 'border-red-500' : ''}`}
                  value={searchForm.endDateTo}
                  onChange={(e) => handleInputChange('endDateTo', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">プロジェクト名で検索</label>
              <input 
                type="text"
                className="w-full border rounded p-2"
                placeholder="プロジェクト名を入力"
                value={searchForm.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={handleSearch}
              >
                検索
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 検索結果 */}
      {hasSearched && (
        <>
          {/* プロジェクト一覧 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PJ名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事業部</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P種別</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ランク</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">売上高_実績(千円)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">開始日</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">終了日</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.division}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.projectType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.pm}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.sales.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{project.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          {searchResults.length > 0 && (
            <div className="mt-4 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                  前へ
                </button>
                <span className="px-4 py-1">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                  次へ
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectSearch;
