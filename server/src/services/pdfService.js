import PDFDocument from 'pdfkit';

export const generateResumePDF = (resume) =>
    new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 40 });
        const buffers = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('error', reject);
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        const { personal = {}, summary, skills = [], experiences = [], projects = [], education = [] } =
            resume;

        doc.fontSize(22).text(personal.fullName || 'Resume', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).text(`Email: ${personal.email ?? '-'}`);
        doc.text(`Phone: ${personal.phone ?? '-'}`);
        doc.text(`Location: ${personal.location ?? '-'}`);
        if (personal.website) doc.text(`Website: ${personal.website}`);
        doc.moveDown();

        if (summary) {
            doc.fontSize(14).text('Professional Summary', { underline: true });
            doc.moveDown(0.3);
            doc.fontSize(11).text(summary);
            doc.moveDown();
        }

        if (skills.length) {
            doc.fontSize(14).text('Skills', { underline: true });
            doc.moveDown(0.3);
            doc.fontSize(11).text(skills.join(', '));
            doc.moveDown();
        }

        if (experiences.length) {
            doc.fontSize(14).text('Experience', { underline: true });
            doc.moveDown(0.3);
            experiences.forEach((exp) => {
                doc.fontSize(12).text(`${exp.role || 'Role'} — ${exp.company || 'Company'}`);
                doc.fontSize(10).text(`${exp.startDate || ''} - ${exp.endDate || ''}`);
                if (Array.isArray(exp.achievements)) {
                    exp.achievements.forEach((achievement) => {
                        doc.fontSize(10).list([achievement]);
                    });
                }
                doc.moveDown();
            });
        }

        if (projects.length) {
            doc.fontSize(14).text('Projects', { underline: true });
            doc.moveDown(0.3);
            projects.forEach((project) => {
                doc.fontSize(12).text(project.name || 'Project');
                if (project.description) {
                    doc.fontSize(10).text(project.description);
                }
                if (project.link) {
                    doc.fontSize(10).fillColor('blue').text(project.link, { link: project.link });
                    doc.fillColor('black');
                }
                if (project.tech?.length) {
                    doc.fontSize(10).text(`Tech: ${project.tech.join(', ')}`);
                }
                doc.moveDown();
            });
        }

        if (education.length) {
            doc.fontSize(14).text('Education', { underline: true });
            doc.moveDown(0.3);
            education.forEach((edu) => {
                doc.fontSize(12).text(`${edu.degree || 'Degree'} — ${edu.institution || 'Institution'}`);
                doc.fontSize(10).text(`${edu.startDate || ''} - ${edu.endDate || ''}`);
                if (edu.highlights?.length) {
                    edu.highlights.forEach((highlight) => {
                        doc.fontSize(10).list([highlight]);
                    });
                }
                doc.moveDown();
            });
        }

        doc.end();
    });
