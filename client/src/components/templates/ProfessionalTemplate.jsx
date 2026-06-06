import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto flex bg-white text-gray-800 leading-relaxed min-h-[11in]">
            {/* Sidebar */}
            <div className="w-1/3 p-8 text-white flex flex-col" style={{ backgroundColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-2 tracking-wide uppercase">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                
                <div className="space-y-4 text-sm mt-6 mb-8 text-white/90">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4 opacity-80" />
                            <span className="break-all">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4 opacity-80" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4 opacity-80" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin className="size-4 opacity-80" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="size-4 opacity-80" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-white/30 pb-2">
                            Skills
                        </h2>
                        <div className="flex flex-col gap-2 text-sm text-white/90">
                            {data.skills.map((skill, index) => (
                                <div key={index}>• {skill}</div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-white/30 pb-2">
                            Education
                        </h2>
                        <div className="space-y-4 text-white/90">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-sm">{edu.field}</p>
                                    <p className="text-sm italic">{edu.institution}</p>
                                    <p className="text-xs mt-1">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-xs mt-1">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-3 uppercase tracking-wider text-gray-800 border-b-2 pb-2" style={{ borderColor: accentColor }}>
                            Profile
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-sm">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b-2 pb-2" style={{ borderColor: accentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900" style={{ color: accentColor }}>{exp.position}</h3>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
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
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b-2 pb-2" style={{ borderColor: accentColor }}>
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex items-baseline justify-between mb-1">
                                        <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                        {proj.type && <span className="text-xs text-gray-500 font-medium">{proj.type}</span>}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Extracurriculars */}
                {data.extracurriculars && data.extracurriculars.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b-2 pb-2" style={{ borderColor: accentColor }}>
                            Extracurriculars
                        </h2>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {data.extracurriculars.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
