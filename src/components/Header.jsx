import React from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

function Header({ onDownloadClick }) {  // Pass the download handler
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <img src="./logo.svg" alt="Website Logo" />
      <Button className="flex gap-2 items-center" onClick={onDownloadClick}>  {/* Trigger download */}
        <Download className="h-4 w-4" /> Download
      </Button>
    </div>
  );
}

export default Header;
