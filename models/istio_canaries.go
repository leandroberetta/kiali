package models

// CanariesStatus contains the namespaces that are part of the canary and the namespaces that are still using the current revision
type CanariesStatus struct {
	MigratedNamespaces []string `json:"migratedNamespaces"`
	PendingNamespaces  []string `json:"pendingNamespaces"`
}
