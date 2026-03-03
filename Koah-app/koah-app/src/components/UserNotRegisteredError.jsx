export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-medium text-slate-800">Kayıt gerekli</h1>
        <p className="text-slate-600">
          Bu uygulamayı kullanmak için lütfen kayıt olun.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700"
        >
          Yenile
        </button>
      </div>
    </div>
  )
}
