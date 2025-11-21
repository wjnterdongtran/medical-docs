import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import DictionaryTable from '@site/src/components/DictionaryTable';
import styles from './dictionary.module.css';

export default function DictionaryPage(): React.JSX.Element {
  return (
    <Layout
      title="Clinical Dictionary"
      description="Clinical Data Semantics and Terminology - Search and explore medical terms, diagnoses, procedures, and standardized codes"
    >
      <main className={styles.main}>
        <div className="container">
          <header className={styles.header}>
            <Heading as="h1" className={styles.title}>
              Clinical Dictionary
            </Heading>
            <p className={styles.subtitle}>Clinical Data Semantics and Terminology Reference</p>
            <p className={styles.description}>
              Search and explore standardized medical terminology including diagnoses, procedures,
              laboratory tests, medications, and anatomical terms. Each entry is mapped to standard
              code systems such as ICD-10, SNOMED CT, LOINC, CPT, and RxNorm.
            </p>
          </header>

          <section className={styles.content}>
            <DictionaryTable />
          </section>

          <footer className={styles.footer}>
            <div className={styles.legend}>
              <Heading as="h3" className={styles.legendTitle}>
                Code Systems Reference
              </Heading>
              <ul className={styles.legendList}>
                <li>
                  <strong>ICD-10</strong> - International Classification of Diseases, 10th Revision
                  (Diagnoses)
                </li>
                <li>
                  <strong>SNOMED CT</strong> - Systematized Nomenclature of Medicine Clinical Terms
                  (Clinical concepts)
                </li>
                <li>
                  <strong>LOINC</strong> - Logical Observation Identifiers Names and Codes
                  (Laboratory tests)
                </li>
                <li>
                  <strong>CPT</strong> - Current Procedural Terminology (Medical procedures)
                </li>
                <li>
                  <strong>RxNorm</strong> - Normalized names for clinical drugs (Medications)
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
