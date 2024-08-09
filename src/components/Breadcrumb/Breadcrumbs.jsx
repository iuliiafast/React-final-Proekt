import styles from './Breadcrumbs.module.css'


export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbArialabel}>
      <ol className={styles.breadcrumbOl}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.to}
            className={`${styles.breadcrumbItem} ${breadcrumb.isActive ? styles.active : ''}`}
            aria-current={breadcrumb.isActive ? 'page' : undefined}
          >
            {breadcrumb.isActive ? (
              breadcrumb.label
            ) : (
              <>
                <a href={breadcrumb.to}>{breadcrumb.label}</a>
                {index < breadcrumbs.length - 1 && (
                  <span className={styles.separator}>
                  </span>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}