import random
import string
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def generate_password(request):
    data = request.data
    length = data.get('length')
    include_uppercase = data.get('include_uppercase', True)
    include_lowercase = data.get('include_lowercase', True)
    include_numbers = data.get('include_numbers', True)
    include_symbols = data.get('include_symbols', True)
    avoid_similar = data.get('avoid_similar', False)
    exclude_chars = data.get('exclude_chars', "")

    # Validate the length to ensure it's between 8 and 64
    if not isinstance(length, int) or length < 8 or length > 64:
        return Response({"error": "Password length must be an integer between 8 and 64."}, status=400)

    char_pool = ""
    if include_uppercase:
        char_pool += string.ascii_uppercase
    if include_lowercase:
        char_pool += string.ascii_lowercase
    if include_numbers:
        char_pool += string.digits
    if include_symbols:
        char_pool += "!@#$%^&*()-_+=[]{}|;:'\",.<>?/"

    if avoid_similar:
        char_pool = char_pool.replace('l', '').replace('1', '').replace('O', '').replace('0', '')

    for char in exclude_chars:
        char_pool = char_pool.replace(char, '')

    if not char_pool:
        return Response({"error": "No characters available to generate a password."}, status=400)

    password = ''.join(random.choices(char_pool, k=length))
    return Response({"password": password})
