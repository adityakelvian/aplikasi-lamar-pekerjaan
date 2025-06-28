import React, { useState } from 'react';

// Main App component
const App = () => {
    // State variables for form inputs
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to current date
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [salutation, setSalutation] = useState('Bapak/Ibu');
    const [bodyParagraphs, setBodyParagraphs] = useState([
        "Dengan hormat,",
        "Berdasarkan informasi yang saya dapatkan mengenai lowongan pekerjaan sebagai [Jabatan Pekerjaan] di [Nama Perusahaan], saya menulis surat ini untuk menyatakan minat saya yang besar terhadap posisi tersebut.",
        "Saya memiliki pengalaman dan kualifikasi yang relevan dengan persyaratan yang Anda cari. Selama berkarir di bidang [Bidang Pekerjaan], saya telah mengembangkan keterampilan dalam [Sebutkan Keterampilan Relevan, contoh: manajemen proyek, analisis data, komunikasi efektif] yang saya yakini akan sangat bermanfaat bagi [Nama Perusahaan].",
        "Saya adalah individu yang proaktif, berdedikasi, dan mampu bekerja secara mandiri maupun dalam tim. Saya bersemangat untuk terus belajar dan berkontribusi secara positif terhadap tujuan perusahaan.",
        "Terlampir bersama ini adalah CV saya untuk pertimbangan lebih lanjut. Saya sangat antusias untuk membahas bagaimana kualifikasi saya dapat memberikan nilai tambah bagi [Nama Perusahaan] dalam sebuah wawancara.",
        "Terima kasih atas waktu dan perhatian Bapak/Ibu. Saya berharap dapat segera mendengar kabar dari Anda.",
        "Hormat saya,"
    ]);
    const [closing, setClosing] = useState('Hormat saya,');
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Function to show a custom modal message
    const showMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    // Function to generate the job letter
    const generateLetter = () => {
        // Basic validation
        if (!name || !address || !phone || !email || !companyName || !jobTitle) {
            showMessage('Harap lengkapi semua bidang yang wajib diisi (Nama, Alamat, Telepon, Email, Nama Perusahaan, Jabatan).');
            return;
        }

        const letterContent = `
${name}
${address}
${phone}
${email}

${date}

Kepada Yth.
HRD ${companyName}
${companyAddress || 'Jl. ... No. ...'}

${salutation},

${bodyParagraphs.join('\n\n')}

${closing}


${name}
        `.trim();
        setGeneratedLetter(letterContent);
        showMessage('Surat lamaran berhasil dibuat!');
    };

    // Function to copy the generated letter to clipboard
    const copyToClipboard = () => {
        if (generatedLetter) {
            // Using document.execCommand for broader compatibility within iframes
            const textarea = document.createElement('textarea');
            textarea.value = generatedLetter;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showMessage('Surat lamaran berhasil disalin ke clipboard!');
            } catch (err) {
                console.error('Gagal menyalin:', err);
                showMessage('Gagal menyalin surat lamaran. Silakan salin secara manual.');
            }
            document.body.removeChild(textarea);
        } else {
            showMessage('Belum ada surat yang dibuat untuk disalin.');
        }
    };

    // Function to download the generated letter as a text file
    const downloadLetter = () => {
        if (generatedLetter) {
            const blob = new Blob([generatedLetter], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Surat_Lamaran_${jobTitle.replace(/ /g, '_') || 'Pekerjaan'}_${name.replace(/ /g, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showMessage('Surat lamaran berhasil diunduh!');
        } else {
            showMessage('Belum ada surat yang dibuat untuk diunduh.');
        }
    };

    // Handle adding/removing paragraphs
    const addParagraph = () => {
        setBodyParagraphs([...bodyParagraphs, '']);
    };

    const updateParagraph = (index, text) => {
        const newParagraphs = [...bodyParagraphs];
        newParagraphs[index] = text;
        setBodyParagraphs(newParagraphs);
    };

    const removeParagraph = (index) => {
        const newParagraphs = bodyParagraphs.filter((_, i) => i !== index);
        setBodyParagraphs(newParagraphs);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 font-inter text-gray-800 flex items-center justify-center">
            {/* Custom Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg mb-4">{modalMessage}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl w-full mx-auto my-8 border-4 border-indigo-300">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-8 leading-tight">
                    <i className="lucide-file-text-bookmark inline-block mr-3"></i>
                    Pembuat Surat Lamaran Kerja
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Personal Information Section */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md border border-indigo-200">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-5 border-b pb-3 border-indigo-300">
                            <i className="lucide-user inline-block mr-2"></i>
                            Informasi Pribadi
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Nama Lengkap Anda"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Jl. Contoh No. 123, Kota"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="+62 812 3456 7890"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="email@contoh.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company and Job Details Section */}
                    <div className="bg-green-50 p-6 rounded-2xl shadow-md border border-green-200">
                        <h2 className="text-2xl font-semibold text-green-600 mb-5 border-b pb-3 border-green-300">
                            <i className="lucide-building inline-block mr-2"></i>
                            Detail Perusahaan & Pekerjaan
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Nama PT / Organisasi"
                                />
                            </div>
                            <div>
                                <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                                <input
                                    type="text"
                                    id="companyAddress"
                                    value={companyAddress}
                                    onChange={(e) => setCompanyAddress(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Alamat Lengkap Perusahaan"
                                />
                            </div>
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Jabatan yang Dilamar</label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Contoh: Manajer Pemasaran"
                                />
                            </div>
                            <div>
                                <label htmlFor="salutation" className="block text-sm font-medium text-gray-700 mb-1">Salam Pembuka</label>
                                <input
                                    type="text"
                                    id="salutation"
                                    value={salutation}
                                    onChange={(e) => setSalutation(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                    placeholder="Yth. Bapak/Ibu HRD"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Letter Body Section */}
                <div className="bg-purple-50 p-6 rounded-2xl shadow-md mb-10 border border-purple-200">
                    <h2 className="text-2xl font-semibold text-purple-600 mb-5 border-b pb-3 border-purple-300">
                        <i className="lucide-text-cursor-input inline-block mr-2"></i>
                        Isi Surat (Edit Sesuai Kebutuhan)
                    </h2>
                    <div className="space-y-4">
                        {bodyParagraphs.map((paragraph, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm resize-y min-h-[60px]"
                                    value={paragraph}
                                    onChange={(e) => updateParagraph(index, e.target.value)}
                                    placeholder={`Paragraf ${index + 1}`}
                                ></textarea>
                                {bodyParagraphs.length > 1 && (
                                    <button
                                        onClick={() => removeParagraph(index)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 flex-shrink-0"
                                        title="Hapus paragraf ini"
                                    >
                                        <i className="lucide-x w-5 h-5"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addParagraph}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md flex items-center justify-center mt-4"
                        >
                            <i className="lucide-plus mr-2"></i> Tambah Paragraf
                        </button>
                    </div>
                </div>

                {/* Closing Section */}
                <div className="bg-yellow-50 p-6 rounded-2xl shadow-md mb-10 border border-yellow-200">
                    <h2 className="text-2xl font-semibold text-yellow-600 mb-5 border-b pb-3 border-yellow-300">
                        <i className="lucide-signature inline-block mr-2"></i>
                        Penutup Surat
                    </h2>
                    <div>
                        <label htmlFor="closing" className="block text-sm font-medium text-gray-700 mb-1">Salam Penutup</label>
                        <input
                            type="text"
                            id="closing"
                            value={closing}
                            onChange={(e) => setClosing(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                            placeholder="Contoh: Hormat saya,"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button
                        onClick={generateLetter}
                        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
                    >
                        <i className="lucide-sparkles mr-3"></i> Buat Surat Lamaran
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition duration-300 shadow-lg transform hover:scale-105"
                    >
                        <i className="lucide-copy mr-3"></i> Salin Surat
                    </button>
                    <button
                        onClick={downloadLetter}
                        className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition duration-300 shadow-lg transform hover:scale-105"
                    >
                        <i className="lucide-download mr-3"></i> Unduh Surat
                    </button>
                </div>

                {/* Generated Letter Display */}
                {generatedLetter && (
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-300">
                            <i className="lucide-clipboard-check inline-block mr-2"></i>
                            Hasil Surat Lamaran
                        </h2>
                        <pre className="whitespace-pre-wrap font-mono text-base bg-white p-5 rounded-lg border border-gray-300 leading-relaxed max-h-96 overflow-y-auto shadow-sm">
                            {generatedLetter}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
