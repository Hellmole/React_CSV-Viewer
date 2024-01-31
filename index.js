/* Import components and styles */
import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { parse } from 'papaparse';
import '../pages/index.css';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [csvData, setCsvData] = useState([]);

  /* Function to load a CSV file */
  const loadCSV = (file) => {
    fetch('/' + file)
      .then(response => response.text())
      .then(data => {
        parse(data, {
          header: false, 
          complete: (results) => {
            setCsvData(results.data);
          }
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  };

  /* Select specific content from the burger menu */
  const selectContent = (contentKey, file) => {
    if (contentKey === 'REPORT') {
      loadCSV(file);
    } else {
      setCsvData([]); 
      setSelectedContent(contentKey);
    }
  };

  /* Render the CSV data table */
  const renderCSVTable = () => {
    return (
      <div className="centered-content">
        <table>
          {/* Remove table header */}
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="centered-content">
      <div class="my-element"></div>  
      <h1>React CSV Viewer</h1>

      {/* Burger menu for file selection */}
      <Menu isOpen={menuOpen} onStateChange={(state) => setMenuOpen(state.isOpen)}>
        <a href="#" onClick={() => selectContent('REPORT', 'file1.csv')}>File 1</a>
        <a href="#" onClick={() => selectContent('REPORT', 'file2.csv')}>File 2</a>
        <a href="#" onClick={() => selectContent('REPORT', 'file3.csv')}>File 3</a>
        <a href="#" onClick={() => selectContent('REPORT', 'file4.csv')}>File 4</a>
      </Menu>

      {/* Display the selected content */}
      <div>
        {csvData.length > 0 ? renderCSVTable() : <div dangerouslySetInnerHTML={{ __html: selectedContent }}></div>}
      </div>
    </div>
  );
}
