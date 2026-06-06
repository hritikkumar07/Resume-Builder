import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	const sectionRenderers = {
		summary: () => data.professional_summary && (
			<section className="mb-8" key="summary">
				<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
					Professional Summary
				</h2>
				<p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
			</section>
		),
		experience: () => data.experience && data.experience.length > 0 && (
			<section className="mb-8" key="experience">
				<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
					Experience
				</h2>
				<div className="space-y-6">
					{data.experience.map((exp, index) => (
						<div key={index} className="relative pl-6 border-l border-gray-250">
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
									<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
								</div>
								<div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-xl">
									{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
								</div>
							</div>
							{exp.description && (
								<div className="text-gray-600 leading-relaxed mt-3 whitespace-pre-line text-sm">
									{exp.description}
								</div>
							)}
						</div>
					))}
				</div>
			</section>
		),
		projects: () => data.projects && data.projects.length > 0 && (
			<section className="mb-8" key="projects">
				<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
					Projects
				</h2>
				<div className="space-y-6">
					{data.projects.map((p, index) => (
						<div key={index} className="relative pl-6 border-l border-gray-250" style={{ borderLeftColor: accentColor }}>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
									{p.type && <p className="text-sm text-gray-500 mt-0.5">{p.type}</p>}
								</div>
							</div>
							{p.description && (
								<div className="text-gray-600 leading-relaxed text-sm mt-3">
									{p.description}
								</div>
							)}
						</div>
					))}
				</div>
			</section>
		),
		education: () => data.education && data.education.length > 0 && (
			<section className="mb-8" key="education">
				<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
					Education
				</h2>
				<div className="space-y-4">
					{data.education.map((edu, index) => (
						<div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
							<h3 className="font-semibold text-gray-900 text-lg">
								{edu.degree} {edu.field && `in ${edu.field}`}
							</h3>
							<p style={{ color: accentColor }} className="font-medium">{edu.institution}</p>
							<div className="flex justify-between items-center text-sm text-gray-500 mt-1">
								<span>{formatDate(edu.graduation_date)}</span>
								{edu.gpa && <span>GPA: {edu.gpa}</span>}
							</div>
						</div>
					))}
				</div>
			</section>
		),
		skills: () => data.skills && data.skills.length > 0 && (
			<section className="mb-8" key="skills">
				<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
					Skills
				</h2>
				<div className="flex flex-wrap gap-2">
					{data.skills.map((skill, index) => (
						<span
							key={index}
							className="px-3.5 py-1 text-sm font-semibold text-white rounded-full transition-all"
							style={{ backgroundColor: accentColor }}
						>
							{skill}
						</span>
					))}
				</div>
			</section>
		),
		extracurricular: () => {
			const items = data.extracurriculars || [];
			return items.length > 0 && (
				<section className="mb-8" key="extracurricular">
					<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
						Extracurricular Activities
					</h2>
					<div className="flex flex-wrap gap-2">
						{items.map((item, index) => (
							<span
								key={index}
								className="px-3.5 py-1 text-sm font-semibold text-white rounded-full transition-all"
								style={{ backgroundColor: accentColor }}
							>
								{item}
							</span>
						))}
					</div>
				</section>
			);
		}
	};

	const order = data.sections_order || ['summary', 'experience', 'projects', 'education', 'skills', 'extracurricular'];

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-md print:shadow-none min-h-[1050px]">
			{/* Header */}
			<header className="p-8 text-white flex flex-col justify-center" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-extrabold mb-3 tracking-tight">
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				{data.personal_info?.profession && (
					<p className="text-white/80 text-lg font-light mb-4 uppercase tracking-wider">
						{data.personal_info.profession}
					</p>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4 shrink-0" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4 shrink-0" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4 shrink-0" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" rel="noopener noreferrer" href={data.personal_info.linkedin} className="flex items-center gap-2 hover:underline">
							<Linkedin className="size-4 shrink-0" />
							<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" rel="noopener noreferrer" href={data.personal_info.website} className="flex items-center gap-2 hover:underline">
							<Globe className="size-4 shrink-0" />
							<span className="break-all text-xs">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{order.map(sectionId => sectionRenderers[sectionId]?.())}
			</div>
		</div>
	);
};

export default ModernTemplate;