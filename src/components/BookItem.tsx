import React, { useState } from 'react';
import BookItemPlaceholder from './BookItemPlaceholder';

interface BookItemProps {
	document: {
		ss_book_identifier: string;
		ss_title_long: string;
		sm_author: string[];
		sm_series: string[];
		ss_series_label: string[];
		sm_publisher: string[];
		sm_field_publication_location: string[];
		ss_publication_date_text: string;
		sm_provider_nid: string[];
		im_field_subject: number[];
		sm_provider_label: string[];
		sm_subject_label: string[];
		bs_status: boolean;
	};
}

const BookItem: React.FC<BookItemProps> = ({ document }) => {
	/* eslint-disable camelcase */
	const {
		ss_book_identifier,
		ss_title_long,
		sm_author,
		sm_series,
		sm_publisher,
		sm_field_publication_location,
		ss_publication_date_text,
		bs_status,
		sm_provider_nid,
		im_field_subject,
		sm_provider_label,
		sm_subject_label
	} = document;
	/* eslint-enable camelcase */

	const baseURL: string = import.meta.env.BASE_URL;

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const imageLoad = (): void => {
		setIsLoaded(true);
	};

	// Eecode HTML entities
	const decodeHtmlEntities = (text: string): string => {
		return text
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&apos;/g, "'");
	};

	/* eslint-disable camelcase */
	// Use ss_identifier instead of field identifier - done
	const identifier = ss_book_identifier;
	const title = ss_title_long || 'N.A.';
	const authors = sm_author || [];
	// Series are all named different - still needs to be done
	const series = sm_series;
	// Assume can be more than one publisher, provider, and subject
	const publisher = sm_publisher?.[0] || 'N.A.';
	const publicationPlace = sm_field_publication_location?.[0] || 'N.A.';
	const publicationDate = ss_publication_date_text || 'N.A.';
	const providerCodes = sm_provider_nid || [];
	const providers = sm_provider_label || [];
	const subjectCodes = im_field_subject || [];
	const subjects = sm_subject_label || [];
	/* eslint-enable camelcase */

	// eslint-disable-next-line camelcase
	return bs_status ? (
		<article className="item">
			<div className="card">
				{/* Thumbnail */}
				<div className="thumbs">
					{!isLoaded && <BookItemPlaceholder />}
					<div className={isLoaded ? 'clipper' : 'clipperNoshadow imagePlaceholder'}>
						<a href={`${baseURL}/books/${identifier}/1`}>
							<img
								src={`https://sites.dlib.nyu.edu/viewer/api/image/books/${identifier}/1/full/150,200/0/default.jpg`}
								alt=""
								title={title}
								onLoad={imageLoad}
							/>
						</a>
					</div>
				</div>
				{/* Title */}
				<h1 className="md_title">
					<a href={`${baseURL}/books/${identifier}/1`}>{title && title}</a>
				</h1>
				{/* Authors */}
				<div className="md_authors">
					<span className="md_label">Author:</span>{' '}
					{authors.length > 0 ? (
						authors.map((author, index) => {
							return (
								<span key={index} className="md_author">
									{author}
								</span>
							);
						})
					) : (
						<span className="md_author">No author available</span>
					)}
				</div>
				{/* Series - not fixed */}
				<div className="md_series">
					<span className="md_label">Series:</span>
					<a className="md_series_each" href={`${baseURL}/series/bulletin-of-the-american-society-of-papyrologists`}>
						Bulletin of the American Society of Papyrologists v. 3
					</a>
				</div>
				{/* Publisher */}
				<div>
					<span className="md_label">Publisher:</span> <span>{decodeHtmlEntities(publisher)}</span>
				</div>
				{/* Place of Publication */}
				<div>
					<span className="md_label">Place of Publication:</span> {publicationPlace}
				</div>
				{/* Date of Publication */}
				<div>
					<span className="md_label">Date of Publication:</span> {publicationDate}
				</div>
				{/* Subjects */}
				<div className="md_subjects">
					<span className="md_label">Subject:</span>
					{subjects.map((subject: string, index: number) => (
						<a key={index} className="md_subject" href={`${baseURL}/subjects/${subjectCodes[index]}`}>
							{subject}
						</a>
					))}
				</div>
				{/* Partners */}
				<div className="md_partner">
					<span className="md_label">Provider:</span>
					{providers.map((provider: string, index: number) => (
						<a key={index} className="md_provider" href={`${baseURL}/providers/${providerCodes[index]}`}>
							{provider}
						</a>
					))}
				</div>
			</div>
		</article>
	) : null;
};

export default BookItem;
