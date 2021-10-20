package sidecars

import (
	networking_v1alpha3 "istio.io/client-go/pkg/apis/networking/v1alpha3"

	"github.com/kiali/kiali/models"
)

type GlobalChecker struct {
	RootNamespace string
	Sidecar       networking_v1alpha3.Sidecar
}

func (gc GlobalChecker) Check() ([]*models.IstioCheck, bool) {
	checks, valid := make([]*models.IstioCheck, 0), true

	if gc.RootNamespace != gc.Sidecar.Namespace {
		return checks, valid
	}

	if gc.Sidecar.Spec.WorkloadSelector != nil && len(gc.Sidecar.Spec.WorkloadSelector.Labels) > 0 {
		check := models.Build("sidecar.global.selector", "spec/workloadSelector")
		checks = append(checks, &check)
	}
	return checks, valid
}
