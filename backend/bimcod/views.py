from rest_framework.response import Response
from rest_framework.views import APIView

from backend.settings import NOW_HOST
from bimcod.json_init.calculator_get import calculator
from bimcod.models import NewsObject, Project, CapitalType, LinearProject, LinearProjectWork, LinearWork, \
    CapitalProject, CapitalWork, CapitalProjectWork


class NewsList(APIView):
    @staticmethod
    def get(request):
        page = int(request.GET.get('page', 1))

        result = [{
                "id": x.id,
                "title": x.title,
                "description": x.description,
                "url": x.image.url
            } for x in NewsObject.objects.all()[(6 * (page - 1)):(6 * page)]]

        return Response(result)


class ProjectsList(APIView):
    @staticmethod
    def get(request):
        page = int(request.GET.get('page', 1))

        result = [{
                "id": x.id,
                "title": x.title,
                "description": x.description,
                "images": [{
                    "url": NOW_HOST + e.image.url,
                    "alt": e.alt
                } for e in x.images.all()]
            } for x in Project.objects.all()[(6 * (page - 1)):(6 * page)]]

        return Response(result)


class GetProjectById(APIView):
    @staticmethod
    def get(request):
        p_id = int(request.GET.get('id', -1))

        project = Project.objects.get(id=p_id)

        result = {
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "images": [{
                "url": NOW_HOST + x.image.url,
                "alt": x.alt
            } for x in project.images.all()]
        }

        return Response(result)


def insert_obj_result(obj, project_obj, work_obj, project_work_obj, vars_field):
    obj["variants"][0]["k"] = project_obj.field["Коэффициент"]
    obj["variants"][1]["k"] = work_obj.field["Коэффициент"]
    obj["variants"][2]["k"] = project_work_obj.field["Коэффициент"]

    vars_field.append(list(map(lambda x: {
        "name": x["Название"],
        "price": x["Цена"],
    }, project_obj.field["Разделы"])))

    vars_field.append(list(map(lambda x: {
        "name": x["Название"],
        "price": x["Цена"],
    }, work_obj.field["Разделы"])) + [{
        "name": "Раздел отсутствует в списке",
        "price": -1
    }])

    vars_field.append(list(map(lambda x: {
        "name": x["Название"],
        "price": x["Цена"],
    }, project_work_obj.field["Разделы"])) + [{
        "name": "Раздел отсутствует в списке",
        "price": -1
    }])


class GetCalculator(APIView):
    @staticmethod
    def get(request):
        result = calculator

        cap_type_obj = CapitalType.objects.first()

        cap_type_vars = result["calculator"]["steps"]["2"][0]["variants"]
        cap_type_vars[0]["k"] = cap_type_obj.public
        cap_type_vars[1]["k"] = cap_type_obj.living
        cap_type_vars[2]["k"] = cap_type_obj.prom

        linear = result["calculator"]["steps"]["3"][1]
        linear_project_obj = LinearProject.objects.first()
        linear_work_obj = LinearWork.objects.first()
        linear_project_work_obj = LinearProjectWork.objects.first()
        linear_vars = result["calculator"]["steps"]["4"][1]["variants"]

        insert_obj_result(linear, linear_project_obj, linear_work_obj, linear_project_work_obj, linear_vars)

        capital = result["calculator"]["steps"]["4"][0]
        capital_project_obj = CapitalProject.objects.first()
        capital_work_obj = CapitalWork.objects.first()
        capital_project_work_obj = CapitalProjectWork.objects.first()
        capital_vars = result["calculator"]["steps"]["5"][0]["variants"]

        insert_obj_result(capital, capital_project_obj, capital_work_obj, capital_project_work_obj, capital_vars)

        return Response(result)
