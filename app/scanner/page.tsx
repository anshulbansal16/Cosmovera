import { Scanner } from '@/components/scanner';

export default function ScannerPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Scanner</h1>
      <div className="max-w-2xl mx-auto">
        <Scanner />
      </div>
    </div>
  );
}

