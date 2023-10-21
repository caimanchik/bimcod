from django.contrib import admin

from bimcod.models import Project, NewsObject, ImageProject, LinearProject, LinearWork, LinearProjectWork, CapitalType, \
    CapitalProject, CapitalWork, CapitalProjectWork
from jsoneditor.forms import JSONEditor
from django.db.models.fields.json import JSONField


class JSONAdmin(admin.ModelAdmin):
    formfield_overrides = {
        JSONField: {
            "widget": JSONEditor
        }
    }


admin.site.register(Project)
admin.site.register(NewsObject)
admin.site.register(ImageProject)
admin.site.register(CapitalType)

admin.site.register(LinearProject, JSONAdmin)
admin.site.register(LinearWork, JSONAdmin)
admin.site.register(LinearProjectWork, JSONAdmin)

admin.site.register(CapitalProject, JSONAdmin)
admin.site.register(CapitalWork, JSONAdmin)
admin.site.register(CapitalProjectWork, JSONAdmin)
