import Form from './components/Form';

export default function App() {
  return (
    <>
      <main className="font-karla tracking-tight font-normal pt-8 lg:pt-32 px-4 bg-green-200 pb-4 text-grey-900 min-h-screen flex items-center justify-center">
        <div className="bg-white w-full max-w-[740px] p-6 lg:px-10 lg:pt-8 lg:pb-10 rounded-2xl shadow-sm">
          <h1 className="text-[32px] font-bold tracking-tight mb-6">
            Contact Us
          </h1>
          <Form />
        </div>
      </main>
      <footer className="font-karla text-grey-900 tracking-normal bg-green-200 flex items-center flex-col px-4 pt-2 pb-8 lg:pb-32">
        <span>
          Challenge by{' '}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            className="text-green-600"
          >
            Frontend Mentor
          </a>
          .
        </span>
        <span>
          Coded by{' '}
          <a
            href="https://github.com/waldosmuts"
            target="_blank"
            className="text-green-600"
          >
            Waldo
          </a>
          .
        </span>
      </footer>
    </>
  );
}
