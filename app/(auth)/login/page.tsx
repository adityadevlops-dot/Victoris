export default function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">VICTORIS</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-50 focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-50 focus:border-accent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-accent hover:bg-accent-dark text-white font-medium rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
