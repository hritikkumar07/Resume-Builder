import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-gray-50 text-gray-800 leading-relaxed min-h-[11in] relative shadow-lg">
            {/* Header / Hero Section */}
            <div className="pt-12 pb-8 px-10 text-center relative overflow-hidden" style={{ backgroundColor: accentColor }}>
                <div className="relative z-10 text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-3">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.professional_summary && (
                        <p className="max-w-2xl mx-auto text-sm text-white/90 font-medium italic">
                            {data.professional_summary}
                        </p>
                    )}
                </div>
            </div>

            {/* Contact Strip */}
            <div className="bg-gray-900 text-white py-3 px-10 flex flex-wrap justify-center gap-6 text-xs font-medium tracking-wide">
                {data.personal_info?.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="size-3 text-gray-400" />
                        <span>{data.personal_info.email}</span>
                    </div>
                )}
                {data.personal_info?.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="size-3 text-gray-400" />
                        <span>{data.personal_info.phone}</span>
                    </div>
                )}
                {data.personal_info?.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="size-3 text-gray-400" />
                        <span>{data.personal_info.location}</span>
                    </div>
                )}
                {data.personal_info?.linkedin && (
                    <div className="flex items-center gap-2">
                        <Linkedin className="size-3 text-gray-400" />
                        <span>{data.personal_info.linkedin}</span>
                    </div>
                )}
                {data.personal_info?.website && (
                    <div className="flex items-center gap-2">
                        <Globe className="size-3 text-gray-400" />
                        <span>{data.personal_info.website}</span>
                    </div>
                )}
            </div>

            {/* Main Content Layout */}
            <div className="p-10 flex gap-10">
                
                {/* Left Column (Main content) */}
                <div className="w-2/3 space-y-8">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black mb-5 text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                                        <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 bg-white border-2" style={{ borderColor: accentColor }}></div>
                                        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-semibold text-gray-600" style={{ color: accentColor }}>{exp.company}</p>
                                            <p className="text-xs font-bold text-gray-400 tracking-wider">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </p>
                                        </div>
                                        {exp.description && (
                                            <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black mb-5 text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                Projects
                            </h2>
                            <div className="grid gap-4">
                                {data.projects.map((proj, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                            {proj.type && <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-md text-gray-600">{proj.type}</span>}
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar content) */}
                <div className="w-1/3 space-y-8">
                    
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black mb-4 text-gray-900 border-b-2 border-gray-200 pb-2">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                                        <p className="text-sm font-medium" style={{ color: accentColor }}>{edu.field}</p>
                                        <p className="text-xs text-gray-500 mt-1">{edu.institution}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs font-bold text-gray-400">{formatDate(edu.graduation_date)}</p>
                                            {edu.gpa && <p className="text-xs font-bold bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">GPA: {edu.gpa}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black mb-4 text-gray-900 border-b-2 border-gray-200 pb-2">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Extracurriculars */}
                    {data.extracurriculars && data.extracurriculars.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black mb-4 text-gray-900 border-b-2 border-gray-200 pb-2">Activities</h2>
                            <ul className="space-y-2">
                                {data.extracurriculars.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-xl leading-none mt-0.5" style={{ color: accentColor }}>•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CreativeTemplate;
