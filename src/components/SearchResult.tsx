import React from 'react'

interface SearchResultProps {
  // Add any props if needed
}

const SearchResult: React.FC<SearchResultProps> = () => {
  return (
    <article className="item">
      <div className="card">
        <div className="thumbs">
          <div className="clipper">
            <a href="/books/isaw_basp000003/1">
              <img src="https://sites.dlib.nyu.edu/viewer/api/image/books/isaw_basp000003/1/full/150,/0/default.jpg" alt="" title="Abbreviations in Greek literary papyri and ostraca"/>
            </a>
          </div>
        </div>
        <h1 className="md_title"><a href="/books/isaw_basp000003/1">Abbreviations in Greek literary papyri and ostraca</a></h1>
        <div className="md_authors"><span className="md_label">Author:</span> <span className="md_author">McNamee, Kathleen.</span></div>
        <div className="md_series">
          <span className="md_label">Series:</span>
              <a className="md_series_each" href="/series/bulletin-of-the-american-society-of-papyrologists">Bulletin of the American Society of Papyrologists v. 3</a>
        </div>
        <div><span className="md_label">Publisher:</span> <span>Scholars Press</span></div>
        <div><span className="md_label">Place of Publication:</span> Chico, Calif</div>
        <div><span className="md_label">Date of Publication:</span> ©1981</div>
        <div className="md_subjects">
          <span className="md_label">Subject:</span>
              <a className="md_subject" href="/subjects/4087">Papyrology</a>
              <a className="md_subject" href="/subjects/4093">Greek Manuscripts (Papyri)</a>
              <a className="md_subject" href="/subjects/4094">Ostraka</a>
              <a className="md_subject" href="/subjects/4095">Greek Abbreviations</a>
              <a className="md_subject" href="/subjects/4096">Greek language -- Glossaries and vocabularies</a>
        </div>
        <div className="md_partner">
          <span className="md_label">Provider:</span>
              <a className="md_provider" data-code="" data-id="14415" href="/providers/14415">The American Society of Papyrologists</a>
        </div>
      </div>
    </article>
  )
}

export default SearchResult;
