from django_hosts import patterns, host

from backend import settings

host_patterns = patterns('',
    host(r'api', settings.ROOT_URLCONF, name='api'),
    host(r'www', settings.ROOT_URLCONF, name='www'),
)